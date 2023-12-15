import { GetViewerResponse } from '@lunaticenslaved/schema/dist/types/actions';

import { client } from '../client';

export const actions = {
  get: client.createAction<GetViewerResponse, void>({
    endpoint: 'chat-api',
    path: '/viewer/get',
  }),
};
