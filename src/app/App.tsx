import { Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { PageLoader } from "@/shared/components/page-loader";

import { store } from "@/config/store";

import { Router } from "./router";
import { useViewer } from "@/entities/viewer";
import { QueryClient, QueryClientProvider } from "react-query";

const PagesWithStore = () => {
  const { refresh, isRefreshing } = useViewer();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return isRefreshing ? <PageLoader /> : <Router />;
};

const client = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <PagesWithStore />
          </Suspense>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}
