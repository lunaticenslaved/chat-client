import { Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { PageLoader } from "@/shared/components/page-loader";

import { store } from "@/config/store";

import { Router } from "./router";
import { useViewer } from "@/entities/viewer";

const PagesWithStore = () => {
  const { refresh, isRefreshing } = useViewer();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return isRefreshing ? <PageLoader /> : <Router />;
};

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <PagesWithStore />
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}
