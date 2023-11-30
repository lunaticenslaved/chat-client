import { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { useViewer } from '@/entities/viewer';
import { SignUpRequest, ViewerAPI } from '@/entities/viewer';
import { Handlers } from '@/shared/types';

export type UseSignUpRequest = Handlers & {
  redirectTo?: string;
};

export type UseSignUpResponse = {
  isLoading: boolean;
  signUp(values: SignUpRequest): Promise<void>;
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
    mutationFn: ViewerAPI.signUp,
  });

  const signUp = useCallback(
    async (data: SignUpRequest) => {
      try {
        const { user } = await mutateAsync(data);

        viewerHook.set(user);

        if (onSuccess) onSuccess();
        if (redirectTo) navigate(redirectTo);
      } catch (error) {
        if (onError) {
          onError(error as Error);
        }
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
