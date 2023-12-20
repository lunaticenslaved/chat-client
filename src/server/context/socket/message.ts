import { OperationResponse } from '@lunaticenslaved/schema/dist/types/models';

import { DeleteMessageResponse, MessageServerEvent, SendMessageResponse } from '#/api/message';
import { messagesPipe } from '#/server/pipes/message';
import { Message } from '#/server/service/messages';
import { IRequestContext } from '#/server/shared/operation';

import { SocketEventEmitter } from './_base';

export class MessageSocketEvents extends SocketEventEmitter {
  async onMessageCreated(request: IRequestContext, message: Message) {
    const response: OperationResponse<SendMessageResponse> = {
      data: await messagesPipe.fromServerToDomain(request, message),
      error: null,
    };

    this.context.socketServer.to(message.connectionId).emit(MessageServerEvent.Created, response);
  }

  onMessageDeleted(data: DeleteMessageResponse) {
    const response: OperationResponse<DeleteMessageResponse> = {
      data,
      error: null,
    };

    this.context.socketServer.to(data.connectionId).emit(MessageServerEvent.Deleted, response);
  }
}
