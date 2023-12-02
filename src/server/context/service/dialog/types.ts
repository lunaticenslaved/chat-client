import { DialogFull } from '@/models';

export interface CreateDialogRequest {
  partnerId: string;
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
}
export type ListDialogResponse = DialogFull[];
