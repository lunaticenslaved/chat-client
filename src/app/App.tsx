import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "shared/hooks";
import { viewerService } from "features/viewer/service";
import { viewerActions, viewerSelectors } from "features/viewer/store";
import { SpinnerContainer } from "widgets/spinner-container";

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
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(viewerSelectors.selectIsAuthorized);
  const [isCheckingAuth, setCheckingAuth] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      setCheckingAuth(true);

      viewerService
        .refreshAuth({
          onSuccess: (res) => dispatch(viewerActions.setAuthorized(res)),
          onError: () => dispatch(viewerActions.setUnauthorized()),
        })
        .finally(() => setCheckingAuth(false));
    }
  }, []);

  React.useEffect(() => {
    if (isAuthorized) navigate("/im", { replace: false });
    else navigate("/login", { replace: false });
  }, [isAuthorized]);

  if (isCheckingAuth) {
    return <SpinnerContainer />;
  }

  return isAuthorized ? <PrivatePages /> : <PublicPages />;
};

export default App;
