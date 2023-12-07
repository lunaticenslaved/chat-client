import { ReactNode, useEffect } from 'react';

import libAxios, { AxiosError } from 'axios';

import { Errors } from '@lunaticenslaved/schema';

import { api } from '@/shared/api';
import { fingerprint } from '@/shared/fingerprint';
import { Token } from '@/shared/token';

export interface ClientWrapperProps {
  onRefreshTokenExpired(): void;
  children: ReactNode;
}

export function ClientWrapper({ onRefreshTokenExpired, children }: ClientWrapperProps) {
  useEffect(() => {
    const axios = libAxios.create();

    async function callRefreshAndSetToken() {
      console.log('NEED REFRESH');

      try {
        const response = await api.actions.auth.refresh({
          axios: libAxios.create({
            withCredentials: true,
          }),
          data: {
            fingerprint: await fingerprint.create(),
          },
        });

        Token.set(response);
      } catch (e) {
        const error = Errors.parse(e);

        if (error instanceof Errors.RefreshTokenExpiredError) {
          console.log('REFRESH TOKEN EXPIRED');

          Token.remove();
          onRefreshTokenExpired();
        }
      }
    }

    axios.interceptors.request.use(async config => {
      const { expiresAt } = Token.get();

      if (new Date() >= expiresAt) {
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
