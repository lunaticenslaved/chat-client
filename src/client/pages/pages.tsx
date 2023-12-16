import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PageLoader } from '#/client/shared/components/page-loader';

import { useAuthPages } from './auth/pages';
import { useRootPages } from './root/pages';

const Error404 = lazy(() => import('./not-found'));

export function Pages() {
  const authPages = useAuthPages();
  const rootPages = useRootPages();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {authPages}
        {rootPages}

        <Route index element={<Navigate to="/chat" />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Suspense>
  );
}
