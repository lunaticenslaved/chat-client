import { Dialog } from '@common/models/dialog';

import { ResponseUtils } from '@lunaticenslaved/schema';
import { OperationResponse } from '@lunaticenslaved/schema/models';

import { api } from '@/shared/api';

export interface ListDialogRequest {
  search?: string;
}
export interface ListDialogsResponse {
  dialogs: Dialog[];
}

export const DialogActions = {
  list: (data: ListDialogRequest) =>
    api.client
      .createAction<OperationResponse<ListDialogsResponse>, ListDialogRequest>({
        method: 'GET',
        endpoint: 'chat-api',
        path: data =>
          data.search ? `/dialogs?search=${encodeURIComponent(data.search)}` : '/dialogs',
      })({ data })
      .then(ResponseUtils.unwrapResponse),
};
