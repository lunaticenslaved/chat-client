/* eslint-disable unused-imports/no-unused-vars */
import https from 'https';

import schema from '@lunaticenslaved/schema';

// FIXME use certificate
const agent = new https.Agent({
  rejectUnauthorized: false,
});

schema.client.axios.interceptors.request.use(config => {
  config.httpsAgent = agent;

  return config;
});
