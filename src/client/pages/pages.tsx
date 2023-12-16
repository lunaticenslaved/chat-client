import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PageLoader } from '#/client/shared/components/page-loader';

import { authPages } from './auth/pages';
import { errorPages } from './errors/pages';
import { rootPages } from './root/pages';

export function Pages() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {authPages}
        {rootPages}
        {errorPages}

        <Route index element={<Navigate to="/chat" />} />
      </Routes>
    </Suspense>
  );
}
