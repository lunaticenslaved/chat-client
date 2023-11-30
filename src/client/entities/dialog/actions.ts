import { ResponseUtils } from '@lunaticenslaved/schema';
import { OperationResponse } from '@lunaticenslaved/schema/models';

import { DialogModel } from '@/entities/dialog';
import { client } from '@/shared/client';

export interface ListDialogRequest {
  search?: string;
}
export interface ListDialogsResponse {
  dialogs: DialogModel[];
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
