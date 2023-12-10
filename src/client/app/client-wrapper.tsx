import { ReactNode, useEffect } from 'react';

import libAxios, { AxiosError } from 'axios';

import { Errors } from '@lunaticenslaved/schema';

import { api } from '#/client/shared/api';
import { fingerprint } from '#/client/shared/fingerprint';
import { Token } from '#/client/shared/token';

export interface ClientWrapperProps {
  onRefreshTokenExpired(): void;
  children: ReactNode;
}

export function ClientWrapper({ onRefreshTokenExpired, children }: ClientWrapperProps) {
  useEffect(() => {
    const axios = libAxios.create();

    async function callRefreshAndSetToken() {
      console.log('NEED REFRESH');

      const response = await api.actions.auth.refresh(
        {
          axios: libAxios.create({
            withCredentials: true,
          }),
          data: {
            fingerprint: await fingerprint.create(),
          },
        },
        'operation',
      );

      if (response.error) {
        console.log('REFRESH ERROR');
        onRefreshTokenExpired();
        Token.remove();
      } else {
        Token.set(response.data);
      }
    }

    axios.interceptors.request.use(async config => {
      const { expiresAt } = Token.get();

      if (new Date() >= expiresAt) {
        console.log('TOKEN IS EXPIRED');
        await callRefreshAndSetToken();
      }

      const { token } = Token.get();

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
          await callRefreshAndSetToken();
        }

        if (error instanceof Errors.RefreshTokenExpiredError) {
          onRefreshTokenExpired();
        }
      },
    );

    api.client.setAxios(axios);
  }, [onRefreshTokenExpired]);

  return <>{children}</>;
}
