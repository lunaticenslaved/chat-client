import { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';

import { api } from '@/shared/api';
import { Handlers } from '@/shared/types';

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
    mutationFn: api.actions.auth.resendEmail,
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
