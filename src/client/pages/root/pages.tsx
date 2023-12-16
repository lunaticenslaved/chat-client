import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { withLoadPage } from '#/client/shared/hoc/loadPage';

import { RootLayout } from './layout';

const Chat = withLoadPage(lazy(() => import('./chat/page')));
const Settings = withLoadPage(lazy(() => import('./settings/page')));

export const rootPages = (
  <Route element={<RootLayout />}>
    <Route path="/chat" element={<Chat />} />
    <Route path="/settings" element={<Settings />} />
  </Route>
);
