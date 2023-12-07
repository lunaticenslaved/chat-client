import 'dotenv/config';

import { client } from '@lunaticenslaved/schema';

import { createApp } from './app';

createApp();

if (process.env.AUTH_API_URL) {
  client.endpoints.setHost('authApi', process.env.AUTH_API_URL);
}
