import { client } from '../client';

import { SearchInChannelsRequest, SearchInChannelsResponse } from './types';

export const actions = {
  inChannels: client.createAction<SearchInChannelsResponse, SearchInChannelsRequest>({
    endpoint: 'chat-api',
    path: 'search/in-channels',
  }),
};
