import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { withLoadPage } from '#/client/shared/hoc/loadPage';

import { ErrorLayout } from './layout';

const Error404 = withLoadPage(lazy(() => import('./page-404')));

export const errorPages = (
  <Route element={<ErrorLayout />}>
    <Route path="/404" element={<Error404 />} />
    <Route path="*" element={<Navigate to="/404" />} />
  </Route>
);
