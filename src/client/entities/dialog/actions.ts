import { Dialog } from '@common/models/dialog';

import { ResponseUtils } from '@lunaticenslaved/schema';
import { OperationResponse } from '@lunaticenslaved/schema/models';

import { client } from '@/shared/client';

export interface ListDialogRequest {
  search?: string;
}
export interface ListDialogsResponse {
  dialogs: Dialog[];
}

export const DialogActions = {
  list: (data: ListDialogRequest) =>
    client
      .createAction<OperationResponse<ListDialogsResponse>, ListDialogRequest>({
        method: 'GET',
        endpoint: 'chat-api',
        path: data =>
          data.search ? `/dialogs?search=${encodeURIComponent(data.search)}` : '/dialogs',
      })({ data })
      .then(ResponseUtils.unwrapResponse),
};
