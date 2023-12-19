import { DeleteMessageResponse } from '#/api/message';
import { Message } from '#/domain/message';
import { Connection } from '#/server/models/connection';
import { logger } from '#/server/shared';

type Events = {
  'connection-created': [Connection];
  'message-created': [Message];
  'message-deleted': [DeleteMessageResponse];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listeners = Partial<Record<string, Array<(...args: any) => void>>>;

export class EventBus {
  private listeners: Listeners = {};

  on<TEvent extends keyof Events>(event: TEvent, fn: (...args: Events[TEvent]) => void) {
    const arr = this.listeners[event] || [];

    arr.push(fn);

    this.listeners[event] = arr;
  }

  off<TEvent extends keyof Events>(event: TEvent, fn: (...args: Events[TEvent]) => void) {
    const arr = (this.listeners[event] || []).filter(f => f !== fn);

    this.listeners[event] = arr;
  }

  emit<TEvent extends keyof Events>(event: TEvent, ...args: Events[TEvent]) {
    const listeners = this.listeners[event] || [];
    logger.info(`[EVENT BUS] Event '${event}' occurred. Listeners: ${listeners.length}`);
    for (const listener of listeners) {
      listener(...args);
    }
  }
}

export const eventBus = new EventBus();
