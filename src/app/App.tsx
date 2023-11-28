import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@/config/store';
import { useViewer } from '@/entities/viewer';
import { useLogout } from '@/features/auth/logout';
import { PageLoader } from '@/shared/components/page-loader';
import { Token } from '@/shared/token';

import { ClientWrapper } from './client-wrapper';
import { Router } from './router';

const PagesWithStore = () => {
  const { isFetching } = useViewer({ fetch: Token.exists() });
  const { logout } = useLogout();

  return (
    <ClientWrapper onRefreshTokenExpired={logout}>
      <Suspense fallback={<PageLoader />}>{isFetching ? <PageLoader /> : <Router />}</Suspense>
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

export function App() {
  const token = Token.get();

  if (token) {
    Token.set(token);
  }

  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <PagesWithStore />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}
