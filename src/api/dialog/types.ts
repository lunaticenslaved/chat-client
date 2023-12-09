import { Dialog } from '#/domain/dialog';

export enum DialogServerEvent {
  Created = 'SERVER:DIALOG:CREATED',
  Listed = 'SERVER:DIALOG:LIST',
}

export enum DialogClientEvent {
  List = 'CLIENT:DIALOG:LIST',
}

export type DialogCreatedData = Dialog;

export type ListDialogsResponse = Dialog[];
export type ListDialogsRequest = {
  take: number;
};
