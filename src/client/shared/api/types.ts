import { Dialog, User } from '@common/models';

export type ListDialogsRequest = void;
export interface ListDialogsResponse {
  dialogs: Dialog[];
}

export interface SearchInChannelsRequest {
  search: string;
}

export interface SearchInChannelsResponse {
  existingDialogs: Dialog[];
  users: User[];
}
