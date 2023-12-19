import { client } from '../client';

import {
  GetConnectionRequest,
  GetConnectionResponse,
  ListConnectionsRequest,
  ListConnectionsResponse,
} from './types';

export const actions = {
  list: client.createAction<ListConnectionsResponse, ListConnectionsRequest>({
    endpoint: 'chat-api',
    path: 'connections/list',
  }),
  get: client.createAction<GetConnectionResponse, GetConnectionRequest>({
    endpoint: 'chat-api',
    path: 'connections/get',
  }),
};
