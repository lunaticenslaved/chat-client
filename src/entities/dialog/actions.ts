import { OperationResponse } from 'node_modules/@lunaticenslaved/schema/dist/umd/models';

import { ResponseUtils } from '@lunaticenslaved/schema';

import { DialogModel } from '@/entities/dialog';
import { client } from '@/shared/client';

export interface ListDialogsResponse {
  dialogs: DialogModel[];
}

export const DialogActions = {
  list: () =>
    client
      .createAction<OperationResponse<ListDialogsResponse>>({
        method: 'GET',
        endpoint: 'chat-api',
        path: '/dialogs',
      })()
      .then(ResponseUtils.unwrapResponse),
};
