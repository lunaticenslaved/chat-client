import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { RootLayout } from './layout';

const Chat = lazy(() => import('./chat/page'));
const Settings = lazy(() => import('./settings/page'));

export const rootPages = (
  <Route element={<RootLayout />}>
    <Route path="/chat" element={<Chat />} />
    <Route path="/settings" element={<Settings />} />
  </Route>
);
