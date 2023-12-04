import { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/config/routes';
import { SignInRequest, ViewerAPI, useViewer } from '@/entities/viewer';
import { fingerprint } from '@/shared/fingerprint';
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
    mutationFn: ViewerAPI.signIn,
  });

  const signIn = useCallback(
    async (values: Values) => {
      try {
        const { user } = await mutateAsync({
          login: values.login,
          password: values.password,
          fingerprint: await fingerprint.create(),
        });

        viewerHook.set(user);

        if (user.isActivated) {
          navigate(ROUTES.home, {});
        } else {
          navigate(ROUTES.auth.confirmEmailRequired);
        }

        if (onSuccess) {
          onSuccess(user);
        }
      } catch (error) {
        if (onError) {
          onError(error as Error);
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
