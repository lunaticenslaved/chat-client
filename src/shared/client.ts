import libAxios, { AxiosError } from 'axios';

import { Errors, Operation, ResponseUtils, client } from '@lunaticenslaved/schema';

import { Token } from '@/shared/token';

const axios = libAxios.create({ withCredentials: true });

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  c => c,
  async (axiosError: AxiosError) => {
    const response = axiosError.response;

    if (!response) return;

    const error = Errors.parse(axiosError);

    if (error instanceof Errors.TokenExpiredError) {
      const originalRequest = response.config;

      if (response.status === 401) {
        try {
          const { token } = await Operation.Auth.Refresh.action().then(
            ResponseUtils.unwrapResponse,
          );

          Token.set(token);
          return axios.request(originalRequest);
        } catch (error) {
          // TODO log? alert?
          // eslint-disable-next-line no-console
          console.error('Не авторизован!');
        }
      }
    }
  },
);

client.setAxios(axios);

export { client };
