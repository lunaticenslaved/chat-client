import libAxios from 'axios';

import { Client as BaseClient, client as baseClient } from '@lunaticenslaved/schema';

const axios = libAxios.create();

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// TODO do interceptors on response

baseClient.setAxios(axios);

export class Client extends BaseClient {
  constructor() {
    super();

    this.setAxios(axios);
  }

  setToken(accessToken?: string) {
    if (accessToken) {
      localStorage.setItem('token', accessToken);
    } else {
      localStorage.removeItem('token');
    }
  }
}

const client = new Client();

export { client };
