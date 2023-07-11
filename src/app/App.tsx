import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, useNavigate } from "react-router-dom";

import { useAppSelector } from "shared/hooks";
import { viewerSelectors } from "features/viewer/store";
import { SpinnerContainer } from "widgets/spinner-container";
import { useRefresh } from "features/auth/use-refresh";

import { store } from "./store";
import { PrivatePages, PublicPages } from "./pages";

import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PagesWithStore />
      </BrowserRouter>
    </Provider>
  );
}

const PagesWithStore = () => {
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(viewerSelectors.selectIsAuthorized);
  const { refresh, isLoading: isCheckingAuth } = useRefresh();

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      navigate("/im", { replace: false });
    } else {
      navigate("/login", { replace: false });
    }
  }, [isAuthorized]);

  if (isCheckingAuth) {
    return <SpinnerContainer />;
  }

  if (isAuthorized) {
    return <PrivatePages />;
  }

  return <PublicPages />;
};

export default App;
