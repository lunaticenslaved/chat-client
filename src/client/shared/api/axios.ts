import libAxios from 'axios';

import { Token } from '@/shared/token';

export const axios = libAxios.create({ withCredentials: true });

axios.interceptors.request.use(config => {
  const token = Token.get();

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});
