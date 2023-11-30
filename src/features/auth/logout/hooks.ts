import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/config/routes';
import { ViewerAPI, useViewer } from '@/entities/viewer';
import { Token } from '@/shared/token';

export const useLogout = () => {
  const { mutateAsync: callLogout, isLoading } = useMutation({
    mutationKey: 'logout',
    mutationFn: ViewerAPI.logout,
  });
  const viewerHook = useViewer();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    try {
      navigate(ROUTES.auth.signIn);
      Token.remove();
      viewerHook.set(undefined);
      callLogout();
    } catch (error) {
      console.log('logout error');
    }
  }, [callLogout, navigate, viewerHook]);

  return {
    logout,
    isLoading,
  };
};
