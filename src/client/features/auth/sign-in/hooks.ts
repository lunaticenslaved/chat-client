import { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { message } from 'antd';

import { SignInRequest } from '@lunaticenslaved/schema/actions';

import { ROUTES } from '@/config/routes';
import { useViewer } from '@/entities/viewer';
import { api } from '@/shared/api';
import { fingerprint } from '@/shared/fingerprint';
import { Token } from '@/shared/token';
import { Handlers } from '@/shared/types';

type Values = Omit<SignInRequest, 'fingerprint'>;

export type UseSignInRequest = Handlers;

export type UseSignInResponse = {
  isLoading: boolean;
  signIn(values: Values): Promise<void>;
};

export function useSignIn({ onError, onSuccess }: UseSignInRequest): UseSignInResponse {
  const viewerHook = useViewer();
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: 'sign-in',
    mutationFn: api.actions.auth.signIn,
  });

  const signIn = useCallback(
    async (values: Values) => {
      try {
        const { user, ...data } = await mutateAsync({
          data: {
            login: values.login,
            password: values.password,
            fingerprint: await fingerprint.create(),
          },
        });

        Token.set(data);
        viewerHook.set(user);

        if (user.isActivated) {
          navigate(ROUTES.home, {});
        } else {
          navigate(ROUTES.auth.confirmEmailRequired);
        }

        if (onSuccess) {
          onSuccess(user);
        }
      } catch (e) {
        const error = e as Error;
        if (onError) {
          message.error(`Cannot sign in: ${error.message}`);
          onError(error);
        }
      }
    },
    [mutateAsync, navigate, onError, onSuccess, viewerHook],
  );

  return useMemo(
    () => ({
      isLoading,
      signIn,
    }),
    [isLoading, signIn],
  );
}
