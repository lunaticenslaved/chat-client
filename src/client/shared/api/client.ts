import { Client, Endpoints } from '@lunaticenslaved/schema';

const endpoints = new Endpoints({
  'chat-api': `./api`,
});

export const client = new Client(endpoints);
