import { client } from '../client';

import { BlockUserRequest, ListUsersStatusesResponse } from './types';

export const actions = {
  blockUser: client.createAction<void, BlockUserRequest>({
    endpoint: 'chat-api',
    path: '/users/block',
  }),
  unblockUser: client.createAction<void, BlockUserRequest>({
    endpoint: 'chat-api',
    path: '/users/unblock',
  }),
  listUsersStatuses: client.createAction<ListUsersStatusesResponse, void>({
    endpoint: 'chat-api',
    path: '/users/list-statuses',
  }),
};
