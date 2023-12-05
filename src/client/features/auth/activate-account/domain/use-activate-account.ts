import { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';

import { ActivateRequest } from '@lunaticenslaved/schema/actions';

import { useViewer } from '@/entities/viewer';
import { api } from '@/shared/api';
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
    mutationFn: api.actions.auth.activate,
  });

  const call = useCallback(
    async (data: ActivateRequest) => {
      try {
        const { user } = await mutateAsync({ data });

        viewer.set(user);
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
