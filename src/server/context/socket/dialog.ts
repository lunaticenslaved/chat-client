import { Socket } from 'socket.io';

import { ApiError } from '@lunaticenslaved/schema/dist/types/errors';
import { OperationResponse } from '@lunaticenslaved/schema/dist/types/models';

import { CreateDialogResponse, DialogServerEvent } from '#/api/dialog';
import { DialogFullWithPartner } from '#/server/models';

// TODO: make function in schema to create operation response

export class DialogSocketEvents {
  onDialogCreated(socket: Socket, data: DialogFullWithPartner, error: ApiError | null = null) {
    const response: OperationResponse<CreateDialogResponse> = error
      ? { data: null, error }
      : { data, error: null };

    socket.emit(DialogServerEvent.Created, response);
  }

  onDialogUpdated(socket: Socket, data: DialogFullWithPartner, error: ApiError | null = null) {
    const response: OperationResponse<CreateDialogResponse> = error
      ? { data: null, error }
      : { data, error: null };

    socket.emit(DialogServerEvent.Updated, response);
  }
}
