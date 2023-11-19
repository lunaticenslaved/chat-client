import { useCallback } from 'react';
import { useMutation } from 'react-query';

import { ViewerAPI, useViewer } from '@/entities/viewer';
import { Handlers } from '@/shared/types';

export const useLogout = ({ onError, onSuccess }: Handlers = {}) => {
  const { mutate: callLogout, isLoading } = useMutation({
    mutationKey: 'logout',
    mutationFn: ViewerAPI.logout,
  });
  const viewerHook = useViewer();

  const logout = useCallback(async () => {
    try {
      await callLogout();

      if (onSuccess) {
        viewerHook.setViewer(undefined);

        onSuccess();
      }
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
    }
  }, [callLogout, onError, onSuccess, viewerHook]);

  return {
    logout,
    isLoading,
  };
};
