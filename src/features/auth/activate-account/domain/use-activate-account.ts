import { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';

import { ActivateRequest, ViewerAPI, useViewer } from '@/entities/viewer';
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
  const viewer = useViewer();
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: 'auth/activate',
    mutationFn: ViewerAPI.activateAccount,
  });

  const call = useCallback(
    async (data: ActivateRequest) => {
      try {
        const { user } = await mutateAsync(data);

        viewer.setViewer(user);
        onSuccess?.();
      } catch (error) {
        onError?.(error as Error);
      }
    },
    [mutateAsync, onError, onSuccess, viewer],
  );

  return useMemo(
    () => ({
      call,
      isLoading,
    }),
    [call, isLoading],
  );
}
