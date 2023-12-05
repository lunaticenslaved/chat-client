import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/config/routes';
import { useViewer } from '@/entities/viewer';
import { api } from '@/shared/api';
import { Token } from '@/shared/token';

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
