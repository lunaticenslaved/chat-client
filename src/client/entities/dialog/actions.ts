import { Dialog } from '@common/models/dialog';

import { api } from '@/shared/api';

export interface ListDialogRequest {
  search?: string;
}
export interface ListDialogsResponse {
  dialogs: Dialog[];
}

export const DialogActions = {
  list: (data: ListDialogRequest) =>
    api.client.createAction<ListDialogsResponse, ListDialogRequest>({
      endpoint: 'chat-api',
      path: data =>
        data.search ? `/dialogs?search=${encodeURIComponent(data.search)}` : '/dialogs',
    })({ data }),
};
