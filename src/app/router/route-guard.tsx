import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppSelector } from "shared/hooks";
import { viewerSelectors } from "features/viewer/store";

import { PageAccessType } from "./pages";
import { useLogout } from "features/auth/use-logout";

export interface RouteGuardProps {
  accessType: PageAccessType;
}

export const RouteGuard = ({ accessType }: RouteGuardProps) => {
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(viewerSelectors.selectIsAuthorized);
  const isActivated = useAppSelector(viewerSelectors.selectIsActivated);
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
