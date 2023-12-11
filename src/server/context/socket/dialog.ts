import { ApiError } from '@lunaticenslaved/schema/dist/types/errors';
import { OperationResponse } from '@lunaticenslaved/schema/dist/types/models';

import { CreateDialogResponse, DialogServerEvent, UpdateDialogResponse } from '#/api/dialog';
import { DialogFullWithUsers } from '#/server/models/dialog';

import { SocketEventEmitter } from './_base';

// TODO: make function in schema to create operation response

export class DialogSocketEvents extends SocketEventEmitter {
  onDialogCreated({ user, owner, ...data }: DialogFullWithUsers, error: ApiError | null = null) {
    {
      const response: OperationResponse<CreateDialogResponse> = error
        ? { data: null, error }
        : { data: { ...data, user }, error: null };

      this.context.socketServer.to(data.ownerId).emit(DialogServerEvent.Created, response);
    }

    {
      const response: OperationResponse<CreateDialogResponse> = error
        ? { data: null, error }
        : { data: { ...data, user: owner }, error: null };

      this.context.socketServer.to(data.userId).emit(DialogServerEvent.Created, response);
    }
  }

  onDialogUpdated({ user, owner, ...data }: DialogFullWithUsers, error: ApiError | null = null) {
    {
      const response: OperationResponse<UpdateDialogResponse> = error
        ? { data: null, error }
        : { data: { ...data, user }, error: null };

      this.context.socketServer.to(data.ownerId).emit(DialogServerEvent.Updated, response);
    }

    {
      const response: OperationResponse<UpdateDialogResponse> = error
        ? { data: null, error }
        : { data: { ...data, user: owner }, error: null };

      this.context.socketServer.to(data.userId).emit(DialogServerEvent.Updated, response);
    }
  }
}
