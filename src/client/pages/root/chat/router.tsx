import { lazy } from 'react';
import { Outlet, Route } from 'react-router-dom';

import { MessengerContext } from '#/client/features/messenger';
import { withLoadPage } from '#/client/shared/hoc/loadPage';

const Index = withLoadPage(lazy(() => import('./page-index')));

export const chatRouter = (
  <Route
    path="/chat"
    element={
      <MessengerContext>
        <Outlet />
      </MessengerContext>
    }>
    <Route index element={<Index />} />
  </Route>
);
