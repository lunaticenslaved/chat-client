import { useViewer } from '#/client/entities/viewer';
import { useLogout } from '#/client/features/auth';
import { useAuthNavigation } from '#/client/pages/auth';

export function useIsAuthorizedCheck() {
  const { isAuthorized } = useViewer();
  const { logout } = useLogout();
  const authNavigation = useAuthNavigation();

  if (!isAuthorized) {
    console.log('NOT AUTHORIZED ROUTE ACCESS');

    logout();

    authNavigation.toSignIn();
  }
}

export function useIsActivatedCheck() {
  const { isActivated, isAuthorized } = useViewer();
  const authNavigation = useAuthNavigation();

  useIsAuthorizedCheck();

  if (isAuthorized && !isActivated) {
    authNavigation.toActivate();
  }
}
