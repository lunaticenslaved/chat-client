import { Suspense } from 'react';

import { ClientWrapper } from '#/client/app/client-wrapper';
import { Router } from '#/client/app/router';
import { useLogout } from '#/client/features/auth';
import { PageLoader } from '#/client/shared/components/page-loader';

export const PagesWithStore = () => {
  const { logout } = useLogout();

  return (
    <ClientWrapper onRefreshTokenExpired={logout}>
      <Suspense fallback={<PageLoader />}>
        <Router />
      </Suspense>
    </ClientWrapper>
  );
};
