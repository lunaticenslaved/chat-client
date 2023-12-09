import { DialogFull } from '#/server/models';

export interface CreateDialogRequest {
  userId: string;
  ownerId: string;
}
export type CreateDialogResponse = DialogFull;

export interface GetDialogRequest {
  dialogId: string;
}
export type GetDialogResponse = DialogFull;

export interface ListDialogRequest {
  ownerId: string;
  search?: string;
  take?: number;
  origin: string;
}
export type ListDialogResponse = DialogFull[];
