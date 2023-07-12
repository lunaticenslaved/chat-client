import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useLogout } from "features/auth/use-logout";
import { useViewer } from "features/auth/use-viewer";

import { PageAccessType } from "./pages";

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
      navigate("/sign-in");
      return;
    }

    if (isAuthorized && !isActivated && accessType !== PageAccessType.PrivateCommon) {
      navigate("/confirm-email");
      return;
    }
  }, [accessType, isActivated, isAuthorized, logout, navigate]);

  return <Outlet />;
};
