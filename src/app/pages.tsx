import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { RouteGuard } from "./_lib";

const LoginPage = React.lazy(() => import("pages/auth/login"));
const RegisterPage = React.lazy(() => import("pages/auth/register"));
const ConfirmEmailPage = React.lazy(() => import("pages/auth/confirm-email"));
const ConfirmedPage = React.lazy(() => import("pages/auth/confirmed"));
const HomePage = React.lazy(() => import("pages/home"));
const PageNotFound = React.lazy(() => import("pages/not-found"));

const routes = [
  {
    path: "/",
    needAuth: false,
    dropAuthorization: true,
    component: <LoginPage />,
  },
  {
    path: "/login",
    needAuth: false,
    dropAuthorization: true,
    component: <LoginPage />,
  },
  {
    path: "/register",
    needAuth: false,
    dropAuthorization: true,
    component: <RegisterPage />,
  },
  {
    path: "/confirm-email",
    needAuth: true,
    dropAuthorization: false,
    component: <ConfirmEmailPage />,
  },
  {
    path: "/activate/:link",
    needAuth: false,
    dropAuthorization: false,
    component: <ConfirmedPage />,
  },
  {
    path: "/im",
    needAuth: true,
    dropAuthorization: false,
    component: <HomePage />,
  },
  {
    path: "/*",
    needAuth: true,
    dropAuthorization: false,
    component: <PageNotFound />,
  },
];

export const Pages = () => {
  return (
    <Suspense>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            element={
              <RouteGuard
                dropAuthorization={route.dropAuthorization}
                needAuth={route.needAuth}
              />
            }
          >
            <Route path={route.path} element={route.component} />
          </Route>
        ))}
      </Routes>
    </Suspense>
  );
};

export const PublicPages = () => {
  return (
    <Suspense>
      <Routes>
        {routes
          .filter((p) => !p.needAuth)
          .map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
      </Routes>
    </Suspense>
  );
};

export const PrivatePages = () => {
  return (
    <Suspense>
      <Routes>
        {routes
          .filter((p) => p.needAuth)
          .map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
      </Routes>
    </Suspense>
  );
};
