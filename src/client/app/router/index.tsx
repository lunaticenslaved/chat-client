import { Route, Routes } from 'react-router-dom';

import { PAGES } from './pages';
import { RouteGuard } from './route-guard';

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
