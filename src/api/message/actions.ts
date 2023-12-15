import { client } from '../client';

import { ListMessagesRequest, ListMessagesResponse } from './types';

export const actions = {
  list: client.createAction<ListMessagesResponse, ListMessagesRequest>({
    endpoint: 'chat-api',
    path: 'messages/list',
  }),
};
