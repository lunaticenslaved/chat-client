import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useLogout } from "@/features/auth/use-logout";
import { useViewer } from "@/features/auth/use-viewer";

import { PageAccessType } from "./pages";
import { ROUTES } from "@/config/routes";

export interface RouteGuardProps {
  accessType: PageAccessType;
}

export const RouteGuard = ({ accessType }: RouteGuardProps) => {
  const navigate = useNavigate();
  const { isActivated, isAuthorized } = useViewer();
  const { logout } = useLogout();

  useEffect(() => {
    if (accessType === PageAccessType.Public && isAuthorized) {
      console.log(window.location.pathname);
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
