import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { withLoadPage } from '#/client/shared/hoc/loadPage';

import { RootLayout } from './layout';
import { settingsPages } from './settings/pages';

const Chat = withLoadPage(lazy(() => import('./chat/page')));

export const rootPages = (
  <Route element={<RootLayout />}>
    <Route path="/chat" element={<Chat />} />
    {settingsPages}
  </Route>
);
