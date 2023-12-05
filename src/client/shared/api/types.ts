import { Dialog } from '@common/models';

export interface ListDialogRequest {
  search?: string;
}
export interface ListDialogsResponse {
  dialogs: Dialog[];
}
