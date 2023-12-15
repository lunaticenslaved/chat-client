import { client } from '../client';

import { ListConnectionsRequest, ListConnectionsResponse } from './types';

export const actions = {
  list: client.createAction<ListConnectionsResponse, ListConnectionsRequest>({
    endpoint: 'chat-api',
    path: 'connections/list',
  }),
};
