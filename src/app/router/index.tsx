import { Routes, Route } from "react-router-dom";

import { RouteGuard } from "./route-guard";
import { PAGES } from "./pages";

export const Router = () => {
  return (
    <Routes>
      {PAGES.map(({ component: Component, path, accessType }) => (
        <Route key={path} path={path} element={<RouteGuard accessType={accessType} />}>
          <Route path="" element={<Component />} />
        </Route>
      ))}
    </Routes>
  );
};
