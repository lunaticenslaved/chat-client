import { Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { useRefresh } from "@/features/auth/use-refresh";
import { PageLoader } from "@/shared/components/page-loader";

import { store } from "@/config/store";

import { Router } from "./router";

import "@/shared/styles/index.scss";

import "./App.scss";

const PagesWithStore = () => {
  const { refresh, isLoading } = useRefresh();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return isLoading ? <PageLoader /> : <Router />;
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
