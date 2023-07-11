import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { SpinnerContainer } from "widgets/spinner-container";
import { useRefresh } from "features/auth/use-refresh";

import { store } from "store";

import { Router } from "./router";

import "shared/styles/index.scss";

import "./App.scss";

const PagesWithStore = () => {
  const { refresh, isLoading } = useRefresh();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return isLoading ? <SpinnerContainer /> : <Router />;
};

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PagesWithStore />
      </BrowserRouter>
    </Provider>
  );
}
