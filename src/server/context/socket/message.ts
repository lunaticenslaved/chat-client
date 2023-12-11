import { ApiError } from '@lunaticenslaved/schema/dist/types/errors';
import { OperationResponse } from '@lunaticenslaved/schema/dist/types/models';

import { MessageServerEvent, SendMessageResponse } from '#/api/message';
import { DialogBase } from '#/server/models';

import { SocketEventEmitter } from './_base';

export class MessageSocketEvents extends SocketEventEmitter {
  onMessageCreate(dialog: DialogBase, data: SendMessageResponse, error: ApiError | null = null) {
    const response: OperationResponse<SendMessageResponse> = error
      ? { data: null, error }
      : { data, error: null };

    this.context.socketServer.to(dialog.userId).emit(MessageServerEvent.Created, response);

    if (dialog.userId !== dialog.ownerId) {
      this.context.socketServer.to(dialog.ownerId).emit(MessageServerEvent.Created, response);
    }
  }
}
