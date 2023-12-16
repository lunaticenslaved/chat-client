import { lazy } from 'react';
import { Route } from 'react-router-dom';

const SettingsPage = lazy(() => import('./page'));

export function useSettingsPages() {
  return <Route path="/settings" element={<SettingsPage />} />;
}
