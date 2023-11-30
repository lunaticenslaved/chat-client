import { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/config/routes';
import { SignInRequest, ViewerAPI, useViewer } from '@/entities/viewer';
import { Handlers } from '@/shared/types';

export type UseSignInRequest = Handlers;

export type UseSignInResponse = {
  isLoading: boolean;
  signIn(values: SignInRequest): Promise<void>;
};

export function useSignIn({ onError, onSuccess }: UseSignInRequest): UseSignInResponse {
  const viewerHook = useViewer();
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: 'sign-in',
    mutationFn: ViewerAPI.signIn,
  });

  const signIn = useCallback(
    async (values: SignInRequest) => {
      try {
        const { user } = await mutateAsync({
          login: values.login,
          password: values.password,
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
