import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PageLoader } from '#/client/shared/components/page-loader';

import { useAuthPages } from './auth';
import { useChatPages } from './chat';
import { useSettingsPages } from './settings';

const Error404 = lazy(() => import('./not-found'));

export function Pages() {
  const authPages = useAuthPages();
  const chatPages = useChatPages();
  const settingsPages = useSettingsPages();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {authPages}
        {chatPages}
        {settingsPages}

        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Suspense>
  );
}
