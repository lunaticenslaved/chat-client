import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '#/client/config/routes';
import { useViewer } from '#/client/entities/viewer';
import { api } from '#/client/shared/api';
import { Token } from '#/client/shared/token';

export const useLogout = () => {
  const { mutateAsync: callLogout, isLoading } = useMutation({
    mutationKey: 'logout',
    mutationFn: api.actions.auth.logout,
  });
  const viewerHook = useViewer();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    try {
      navigate(ROUTES.auth.signIn);
      Token.remove();
      viewerHook.set(undefined);
      callLogout({ data: undefined });
    } catch (error) {
      // TODO: do I need any info here?
    }
  }, [callLogout, navigate, viewerHook]);

  return {
    logout,
    isLoading,
  };
};
