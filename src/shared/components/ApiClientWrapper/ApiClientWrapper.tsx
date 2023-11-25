import { ReactNode, useEffect } from 'react';

import libAxios, { AxiosError } from 'axios';

import Schema, { Errors, ResponseUtils, client } from '@lunaticenslaved/schema';

import { Token } from '@/shared/token';

export interface ApiClientWrapperProps {
  onRefreshTokenExpired(): void;
  children: ReactNode;
}

export function ApiClientWrapper({ onRefreshTokenExpired, children }: ApiClientWrapperProps) {
  useEffect(() => {
    const axios = libAxios.create({ withCredentials: true });

    axios.interceptors.request.use(config => {
      const token = Token.get();

      console.log('AUTH TOKEN');

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
              const { token } = await Schema.actions.auth
                .refresh()
                .then(ResponseUtils.unwrapResponse);

              Token.set(token);
              return axios.request(originalRequest);
            } catch (error) {
              // TODO log? alert?
              // eslint-disable-next-line no-console
              console.error('Не авторизован!');
            }
          }
        }

        if (error instanceof Errors.RefreshTokenExpiredError) {
          console.log('REFRESH TOKEN EXPIRED');
          onRefreshTokenExpired();
        }
      },
    );

    client.setAxios(axios);
  }, [onRefreshTokenExpired]);

  return <>{children}</>;
}
