import { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';

import { message } from 'antd';

import { SignUpRequest } from '@lunaticenslaved/schema/dist/types/actions';

import { authActions } from '#/api/auth';
import { useViewer } from '#/client/entities/viewer';
import { useChatNavigation } from '#/client/pages/chat';
import { fingerprint } from '#/client/shared/fingerprint';
import { Token } from '#/client/shared/token';
import { Handlers } from '#/client/shared/types';

type Values = Omit<SignUpRequest, 'fingerprint'>;

export type UseSignUpRequest = Handlers;

export type UseSignUpResponse = {
  isLoading: boolean;
  signUp(values: Values): Promise<void>;
};

export function useSignUp({ onError, onSuccess }: Handlers = {}): UseSignUpResponse {
  const viewerHook = useViewer();
  const chatNavigation = useChatNavigation();
  // TODO replace with app navigation
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

        chatNavigation.toChat();
      } catch (e) {
        const error = e as Error;

        message.error(`Cannot sign up: ${error.message}`);

        if (onError) onError(error);
      }
    },
    [chatNavigation, mutateAsync, onError, onSuccess, viewerHook],
  );

  return useMemo(
    () => ({
      isLoading,
      signUp,
    }),
    [isLoading, signUp],
  );
}
