import { OperationResponse } from '@lunaticenslaved/schema/dist/types/models';

import { DeleteMessageResponse, MessageServerEvent, SendMessageResponse } from '#/api/message';
import { messagesPipe } from '#/server/pipes/message';
import { Message } from '#/server/service/messages';
import { IRequestContext } from '#/server/shared/operation';

import { SocketServer } from '../socket-server';

import { SocketEventEmitter } from './base-socket-emitter';

class MessagesEventsEmitter extends SocketEventEmitter {
  async onMessageCreated(request: IRequestContext, message: Message) {
    const response: OperationResponse<SendMessageResponse> = {
      data: await messagesPipe.fromServerToDomain(request, message),
      error: null,
    };

    SocketServer.emitToConnection(message.connectionId, MessageServerEvent.Created, response);
  }

  onMessageDeleted(data: DeleteMessageResponse) {
    const response: OperationResponse<DeleteMessageResponse> = {
      data,
      error: null,
    };

    SocketServer.emitToConnection(data.connectionId, MessageServerEvent.Deleted, response);
  }
}

export const messagesEventsEmitter = new MessagesEventsEmitter();
