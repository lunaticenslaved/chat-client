import { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';

import { authActions } from '#/api/auth';
import { Handlers } from '#/client/shared/types';

export type UseRepeatConfirmEmailRequest = Handlers;

export type UseRepeatConfirmEmailResponse = {
  repeatEmail(): Promise<void>;
  isLoading: boolean;
};

export function useRepeatConfirmEmail({
  onError,
  onSuccess,
}: UseRepeatConfirmEmailRequest): UseRepeatConfirmEmailResponse {
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: 'repeat-confirm-email',
    mutationFn: authActions.resendEmail,
  });

  const repeatEmail = useCallback(async () => {
    try {
      await mutateAsync({ data: undefined });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
    }
  }, [mutateAsync, onError, onSuccess]);

  return useMemo(
    () => ({
      isLoading,
      repeatEmail,
    }),
    [isLoading, repeatEmail],
  );
}
