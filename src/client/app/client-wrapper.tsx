import { ReactNode, useEffect } from 'react';

import { AxiosError } from 'axios';

import schema, { Errors, ResponseUtils } from '@lunaticenslaved/schema';

import { api } from '@/shared/api';
import { Token } from '@/shared/token';

export interface ClientWrapperProps {
  onRefreshTokenExpired(): void;
  children: ReactNode;
}

export function ClientWrapper({ onRefreshTokenExpired, children }: ClientWrapperProps) {
  useEffect(() => {
    const axios = api.axios;

    api.axios.interceptors.response.use(
      c => c,
      async (axiosError: AxiosError) => {
        const response = axiosError.response;

        if (!response) return;

        const error = Errors.parse(axiosError);

        if (error instanceof Errors.TokenExpiredError) {
          const originalRequest = response.config;

          if (response.status === 401) {
            try {
              const { token } = await schema.actions.auth
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

    api.client.setAxios(axios);
    schema.client.setAxios(axios);
  }, [onRefreshTokenExpired]);

  return <>{children}</>;
}
