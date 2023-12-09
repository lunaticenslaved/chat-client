import { OperationResponse } from '@lunaticenslaved/schema/dist/types/models';

import { Dialog } from '#/domain/dialog';

export enum DialogServerEvent {
  Created = 'SERVER:DIALOG:CREATED',
  Listed = 'SERVER:DIALOG:LIST',
}

export enum DialogClientEvent {
  List = 'CLIENT:DIALOG:LIST',
}

export type CreateDialogResponse = OperationResponse<Dialog>;

export type ListDialogsResponse = OperationResponse<Dialog[]>;
export type ListDialogsRequest = {
  take: number;
};
