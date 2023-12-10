import { Dialog } from '#/domain/dialog';

export enum DialogServerEvent {
  Created = 'SERVER:DIALOG:CREATED',
  Updated = 'SERVER:DIALOG:UPDATED',
}

export type CreateDialogResponse = Dialog;

export type UpdateDialogResponse = Dialog;
