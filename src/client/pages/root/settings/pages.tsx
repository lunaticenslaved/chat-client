import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { withLoadPage } from '#/client/shared/hoc/loadPage';

import { SettingsLayout } from './layout';

const SettingsAccount = withLoadPage(lazy(() => import('./page-account')));
const SettingsAppearance = withLoadPage(lazy(() => import('./page-appearance')));
const SettingsSessions = withLoadPage(lazy(() => import('./page-sessions')));

export const settingsPages = (
  <Route path="/settings" element={<SettingsLayout />}>
    <Route index element={<Navigate to="/settings/account" />} />
    <Route path="account" element={<SettingsAccount />} />
    <Route path="appearance" element={<SettingsAppearance />} />
    <Route path="sessions" element={<SettingsSessions />} />
  </Route>
);
