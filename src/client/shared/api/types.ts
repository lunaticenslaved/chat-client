import { Dialog, User } from '@common/models';

export type ListDialogRequest = void;
export interface ListDialogsResponse {
  dialogs: Dialog[];
}

export interface SearchInChannelsRequest {
  search: string;
}

export interface SearchInChannelsResponse {
  dialogs: Dialog[];
  users: User[];
}
