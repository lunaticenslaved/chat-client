import { Suspense, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { Store } from '@reduxjs/toolkit';

import { useLogout } from '@/features/auth/logout';
import { PageLoader } from '@/shared/components/page-loader';
import constants from '@/shared/constants';
import { useToggle } from '@/shared/hooks';

import { ClientWrapper } from './client-wrapper';
import { Router } from './router';

const PagesWithStore = () => {
  const { logout } = useLogout();

  return (
    <ClientWrapper onRefreshTokenExpired={logout}>
      <Suspense fallback={<PageLoader />}>
        <Router />
      </Suspense>
    </ClientWrapper>
  );
};

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export interface AppProps {
  store: Store;
}

export function App({ store }: AppProps) {
  const loading = useToggle({ value: constants.IS_SERVER_RENDERING || constants.IS_SSR });

  useEffect(() => {
    loading.setFalse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>{loading.isTrue ? <PageLoader /> : <PagesWithStore />}</Provider>
    </QueryClientProvider>
  );
}
