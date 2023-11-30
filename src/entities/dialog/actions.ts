import { OperationResponse } from 'node_modules/@lunaticenslaved/schema/dist/umd/models';

import { ResponseUtils } from '@lunaticenslaved/schema';

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
