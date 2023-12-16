import { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';

import { ActivateRequest } from '@lunaticenslaved/schema/dist/types/actions';

import { authActions } from '#/api/auth';
import { useViewer } from '#/client/entities/viewer';
import { Handlers } from '#/client/shared/types';

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
    mutationFn: authActions.activate,
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
