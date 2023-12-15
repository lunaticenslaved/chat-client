import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { Store } from '@reduxjs/toolkit';

import { useViewer } from '#/client/entities/viewer';
import { useLogout } from '#/client/features/auth/logout';
import { ErrorBoundary } from '#/client/shared/components/error-boundary';
import { PageLoader } from '#/client/shared/components/page-loader';
import constants from '#/client/shared/constants';
import { useToggle } from '#/client/shared/hooks';
import { SocketContext } from '#/client/shared/socket-context';

import { PagesWithStore } from './pages';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

type ContentProps = {
  isLoading: boolean;
};

function Content({ isLoading }: ContentProps) {
  const { logout } = useLogout();
  const { isAuthorized } = useViewer();
  return (
    <ErrorBoundary>
      <SocketContext onTokenInvalid={logout} isAuthorized={isAuthorized}>
        {isLoading ? <PageLoader /> : <PagesWithStore />}
      </SocketContext>
    </ErrorBoundary>
  );
}

export interface AppProps {
  store: Store;
  renderingOnServer: boolean;
}

export function App({ store, renderingOnServer }: AppProps) {
  const loading = useToggle({ value: constants.IS_SERVER_RENDERING || constants.IS_SSR });

  useEffect(() => {
    loading.setFalse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (renderingOnServer) {
    return (
      <Provider store={store}>{loading.isTrue ? <PageLoader /> : <PagesWithStore />}</Provider>
    );
  }

  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <Content isLoading={loading.isTrue} />
      </Provider>
    </QueryClientProvider>
  );
}
