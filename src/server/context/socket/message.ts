import { Errors } from '@lunaticenslaved/schema';
import { OperationResponse } from '@lunaticenslaved/schema/dist/types/models';

import { MessageServerEvent, SendMessageResponse } from '#/api/message';

import { SocketEventEmitter } from './_base';

export class MessageSocketEvents extends SocketEventEmitter {
  onMessageCreated(data: SendMessageResponse, error: Errors.ApiError | null = null) {
    const response: OperationResponse<SendMessageResponse> = error
      ? { data: null, error }
      : { data, error: null };

    this.context.socketServer.to(data.connectionId).emit(MessageServerEvent.Created, response);
  }
}
