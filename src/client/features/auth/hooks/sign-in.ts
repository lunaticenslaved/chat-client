import { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';

import { message } from 'antd';

import { SignInRequest } from '@lunaticenslaved/schema/dist/types/actions';

import { authActions } from '#/api/auth';
import { useViewer } from '#/client/entities/viewer';
import { useAuthNavigation } from '#/client/pages/auth';
import { useChatNavigation } from '#/client/pages/root/chat/navigation';
import { fingerprint } from '#/client/shared/fingerprint';
import { Token } from '#/client/shared/token';
import { Handlers } from '#/client/shared/types';
import { User } from '#/domain/user';

type Values = Omit<SignInRequest, 'fingerprint'>;

export type UseSignInRequest = Handlers<User>;

export type UseSignInResponse = {
  isLoading: boolean;
  signIn(values: Values): Promise<void>;
};

export function useSignIn({ onError, onSuccess }: UseSignInRequest): UseSignInResponse {
  const viewerHook = useViewer();
  const authNavigation = useAuthNavigation();
  const chatNavigation = useChatNavigation();
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: 'sign-in',
    mutationFn: authActions.signIn,
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
          chatNavigation.toChat();
        } else {
          authNavigation.toActivate();
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
    [authNavigation, chatNavigation, mutateAsync, onError, onSuccess, viewerHook],
  );

  return useMemo(
    () => ({
      isLoading,
      signIn,
    }),
    [isLoading, signIn],
  );
}
