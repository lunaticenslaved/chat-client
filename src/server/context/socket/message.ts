import { Socket } from 'socket.io';

import { ApiError } from '@lunaticenslaved/schema/dist/types/errors';
import { OperationResponse } from '@lunaticenslaved/schema/dist/types/models';

import { MessageServerEvent, SendMessageResponse } from '#/api/message';

export class MessageSocketEvents {
  onMessageCreate(socket: Socket, data: SendMessageResponse, error: ApiError | null = null) {
    const response: OperationResponse<SendMessageResponse> = error
      ? { data: null, error }
      : { data, error: null };

    socket.emit(MessageServerEvent.Created, response);
  }
}
