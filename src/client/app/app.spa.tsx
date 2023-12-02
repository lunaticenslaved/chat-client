import { BrowserRouter } from 'react-router-dom';

import '@/shared/styles/index.scss';

import { App as AppBase, AppProps } from './app.base';

export function App(props: AppProps) {
  return (
    <BrowserRouter>
      <AppBase {...props} />
    </BrowserRouter>
  );
}

export default App;
