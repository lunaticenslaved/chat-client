import { Socket } from 'socket.io-client';

import { ResponseUtils } from '@lunaticenslaved/schema';
import { OperationResponse } from '@lunaticenslaved/schema/dist/types/models';

export abstract class SocketEventListener<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Events extends Record<Keys, any>,
  Keys extends string,
  ServerEvents extends string,
> {
  private socket: Socket;
  private listenersMap = new Map();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private listeners: Record<string, any[]> = {};
  abstract eventsMap: Record<Keys, ServerEvents>;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  on<TEvent extends Keys>(
    event: TEvent,
    fn: (args: Events[TEvent]) => void,
    onError?: (error: Error) => void,
  ) {
    const serverEvent = this.eventsMap[event];

    const wrappedListener = (data: OperationResponse<Events[TEvent]>) => {
      console.log(
        `Event '${serverEvent}' occurred. Listeners - ${(this.listeners[event] || []).length}`,
      );

      try {
        const response = ResponseUtils.unwrapResponse(data);
        return fn(response);
      } catch (error) {
        onError && onError(error as Error);
      }
    };

    const arr = this.listeners[event] || [];
    arr.push(wrappedListener);

    const existingWrappedListener = this.listenersMap.get(fn);

    if (existingWrappedListener) {
      this.socket.off(serverEvent, existingWrappedListener);
    }

    this.listeners[event] = arr;
    this.listenersMap.set(fn, wrappedListener);
    this.socket.on(serverEvent as string, wrappedListener);
  }

  off<TEvent extends Keys>(event: TEvent, fn: (args: Events[TEvent]) => void) {
    const wrappedListener = this.listenersMap.get(fn);
    const serverEvent = this.eventsMap[event];

    if (wrappedListener) {
      this.socket.off(serverEvent, wrappedListener);
      this.listeners[event] = (this.listeners[event] || []).filter(
        listener => listener !== wrappedListener,
      );
    }
  }

  offAll() {
    for (const [event, listeners] of Object.entries(this.listeners)) {
      for (const listener of listeners) {
        const serverEvent = this.eventsMap[event as Keys];
        this.socket.off(serverEvent, listener);
      }
    }
  }
}
