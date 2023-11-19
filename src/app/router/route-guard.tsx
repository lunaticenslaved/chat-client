import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { PageAccessType } from './pages';
import { ROUTES } from '@/config/routes';
import { useViewer } from '@/entities/viewer';
import { useLogout } from '@/features/auth/logout';

export interface RouteGuardProps {
  accessType: PageAccessType;
}

export const RouteGuard = ({ accessType }: RouteGuardProps) => {
  const navigate = useNavigate();
  const { isActivated, isAuthorized } = useViewer();
  const { logout } = useLogout();

  useEffect(() => {
    if (accessType === PageAccessType.Public && isAuthorized) {
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
