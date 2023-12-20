import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PageLoader } from '#/client/shared/components/page-loader';

import { authRouter } from './auth/router';
import { errorRouter } from './errors/router';
import { rootRouter } from './root/router';

export function Pages() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {authRouter}
        {rootRouter}
        {errorRouter}

        <Route index element={<Navigate to="/chat" />} />
      </Routes>
    </Suspense>
  );
}
