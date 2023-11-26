import { Client, Endpoints } from '@lunaticenslaved/schema';

import { constants } from './constants';

const endpoints = new Endpoints({
  'chat-api': `${constants.CHAT_SERVER_URL}/api`,
});

export const client = new Client(endpoints);
