import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { Store } from '@reduxjs/toolkit';

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
        <SocketContext>{loading.isTrue ? <PageLoader /> : <PagesWithStore />}</SocketContext>
      </Provider>
    </QueryClientProvider>
  );
}
