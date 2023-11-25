import { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';

import { ActivateRequest, ViewerAPI } from '@/entities/viewer';
import { Handlers } from '@/shared/types';

export interface UseActivateAccountRequest extends Handlers {
  link: string;
}

export interface UseActivateAccountResponse {
  isLoading: boolean;
  call(data: ActivateRequest): Promise<void>;
}

export function useActivateAccount({
  onSuccess,
  onError,
}: Handlers = {}): UseActivateAccountResponse {
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: 'auth/activate',
    mutationFn: ViewerAPI.activateAccount,
  });

  const call = useCallback(
    async (data: ActivateRequest) => {
      try {
        await mutateAsync(data);
        onSuccess?.();
      } catch (error) {
        onError?.(error as Error);
      }
    },
    [mutateAsync, onError, onSuccess],
  );

  return useMemo(
    () => ({
      call,
      isLoading,
    }),
    [call, isLoading],
  );
}
