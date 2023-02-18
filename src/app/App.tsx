import { Provider } from "react-redux";

import { store } from "./store";
import { Pages } from "./pages";

import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <Pages />
    </Provider>
  );
}

export default App;
