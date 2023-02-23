import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "shared/hooks";
import { viewerSelectors, viewerActions } from "features/viewer/store";

interface RouteGuardProps {
  needAuth: boolean;
  dropAuthorization: boolean;
}

// FIXME: стоит избавиться от RouteGuard и перенести перенаправление /confirm-email на уровень Pages

export const RouteGuard = (props: RouteGuardProps) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isAuthorized = useAppSelector(viewerSelectors.selectIsAuthorized);
  const isActivated = useAppSelector(viewerSelectors.selectIsActivated);
  const viewer = useAppSelector(viewerSelectors.selectViewer);

  React.useEffect(() => {
    if (isAuthorized && props.dropAuthorization) {
      dispatch(viewerActions.setUnauthorized());
    }
  }, []);

  if (!isAuthorized && props.needAuth) {
    return <Navigate to="/login" />;
  }

  if (
    isAuthorized &&
    !isActivated &&
    viewer &&
    !pathname.includes("/confirm-email")
  ) {
    return <Navigate to={"/confirm-email"} />;
  }

  return <Outlet />;
};
