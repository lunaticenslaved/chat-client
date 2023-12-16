import { useCallback } from 'react';
import { useMutation } from 'react-query';

import { authActions } from '#/api/auth';
import { useViewer } from '#/client/entities/viewer';
import { useAuthNavigation } from '#/client/pages/auth';
import { Token } from '#/client/shared/token';

export const useLogout = () => {
  const { mutateAsync: callLogout, isLoading } = useMutation({
    mutationKey: 'logout',
    mutationFn: authActions.logout,
  });
  const authNavigation = useAuthNavigation();
  const viewerHook = useViewer();

  const logout = useCallback(() => {
    try {
      authNavigation.toSignIn();
      Token.remove();
      viewerHook.set(undefined);
      callLogout({ data: undefined });
    } catch (error) {
      // TODO: do I need any info here?
    }
  }, [authNavigation, callLogout, viewerHook]);

  return {
    logout,
    isLoading,
  };
};
