import { Socket } from 'socket.io-client';

import { ResponseUtils } from '@lunaticenslaved/schema';
import { OperationResponse } from '@lunaticenslaved/schema/dist/types/models';

export class SocketEventListener {
  protected socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  protected addListener<T>(event: string, fn: (data: T) => void) {
    this.socket.on(event, (data: OperationResponse<T>) => {
      const response = ResponseUtils.unwrapResponse(data);
      return fn(response);
    });
  }
}
