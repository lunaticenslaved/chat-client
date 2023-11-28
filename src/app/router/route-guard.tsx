import { useLayoutEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/config/routes';
import { useViewer } from '@/entities/viewer';
import { useLogout } from '@/features/auth/logout';

import { PageAccessType } from './pages';

export interface RouteGuardProps {
  accessType: PageAccessType;
}

export const RouteGuard = ({ accessType }: RouteGuardProps) => {
  const navigate = useNavigate();
  const { isActivated, isAuthorized } = useViewer();
  const { logout } = useLogout();

  useLayoutEffect(() => {
    if (accessType !== PageAccessType.Public && !isAuthorized) {
      console.log('NOT AUTHORIZED ROUTE ACCESS');
      logout();
      return;
    }

    if (
      [PageAccessType.PrivateCommon, PageAccessType.PrivateConfirmed].includes(accessType) &&
      !isAuthorized
    ) {
      navigate(ROUTES.auth.signIn);
      return;
    }

    if (
      isAuthorized &&
      !isActivated &&
      accessType !== PageAccessType.PrivateCommon &&
      !window.location.pathname.includes(ROUTES.auth.confirmEmailRequired)
    ) {
      navigate(ROUTES.auth.confirmEmailRequired);
      return;
    }
  }, [accessType, isActivated, isAuthorized, logout, navigate]);

  return <Outlet />;
};
