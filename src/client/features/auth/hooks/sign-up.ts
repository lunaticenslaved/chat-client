import { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { message } from 'antd';

import { SignUpRequest } from '@lunaticenslaved/schema/dist/types/actions';

import { authActions } from '#/api/auth';
import { useViewer } from '#/client/entities/viewer';
import { fingerprint } from '#/client/shared/fingerprint';
import { Token } from '#/client/shared/token';
import { Handlers } from '#/client/shared/types';

type Values = Omit<SignUpRequest, 'fingerprint'>;

export type UseSignUpRequest = Handlers & {
  redirectTo?: string;
};

export type UseSignUpResponse = {
  isLoading: boolean;
  signUp(values: Values): Promise<void>;
};

export function useSignUp({
  onError,
  onSuccess,
  redirectTo,
}: UseSignUpRequest = {}): UseSignUpResponse {
  const viewerHook = useViewer();
  // TODO replace with app navigation
  const navigate = useNavigate();
  const { isLoading, mutateAsync } = useMutation({
    mutationKey: 'sign-up',
    mutationFn: authActions.signUp,
  });

  const signUp = useCallback(
    async (data: Values) => {
      try {
        const { user, ...token } = await mutateAsync({
          data: {
            ...data,
            fingerprint: await fingerprint.create(),
          },
        });

        Token.set(token);
        viewerHook.set(user);

        if (onSuccess) onSuccess();
        if (redirectTo) navigate(redirectTo);
      } catch (e) {
        const error = e as Error;

        message.error(`Cannot sign up: ${error.message}`);

        if (onError) onError(error);
      }
    },
    [mutateAsync, navigate, onError, onSuccess, redirectTo, viewerHook],
  );

  return useMemo(
    () => ({
      isLoading,
      signUp,
    }),
    [isLoading, signUp],
  );
}
