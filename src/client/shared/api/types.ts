import { Dialog } from '@domain/dialog';
import { User } from '@domain/user';

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
