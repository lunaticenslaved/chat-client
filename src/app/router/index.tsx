import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { RouteGuard } from "./route-guard";
import { PAGES } from "./pages";

export const Router = () => {
  return (
    <Suspense>
      <Routes>
        {PAGES.map(({ component: Component, path, accessType }) => (
          <Route key={path} path={path} element={<RouteGuard accessType={accessType} />}>
            <Route element={<Component />} />
          </Route>
        ))}
      </Routes>
    </Suspense>
  );
};
