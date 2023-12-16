import { useEffect } from 'react';

import { useViewer } from '#/client/entities/viewer';
import { useLogout } from '#/client/features/auth';
import { useAuthNavigation } from '#/client/pages/auth';

export function useIsAuthorizedCheck() {
  const { isAuthorized } = useViewer();
  const { logout } = useLogout();
  const authNavigation = useAuthNavigation();

  useEffect(() => {
    if (!isAuthorized) {
      console.log('NOT AUTHORIZED ROUTE ACCESS');

      logout();
      authNavigation.toSignIn();
    }
  }, [authNavigation, isAuthorized, logout]);
}

export function useIsActivatedCheck() {
  const { isActivated } = useViewer();
  const authNavigation = useAuthNavigation();

  useIsAuthorizedCheck();

  useEffect(() => {
    if (!isActivated) {
      authNavigation.toActivate();
    }
  }, [authNavigation, isActivated]);
}
