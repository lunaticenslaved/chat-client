import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import { createStore } from '@common/store';

import { constants } from '@/shared/constants';
import '@/shared/styles/index.scss';
import { Token } from '@/shared/token';

import { App } from './app/app.spa';

import 'antd/dist/reset.css';
import 'normalize.css';

const element = document.getElementById('root') as HTMLElement;

const token = Token.get();

if (token) {
  Token.set(token);
}

if (constants.IS_SSR) {
  hydrateRoot(
    element,
    <React.StrictMode>
      <App store={createStore(window.__INITIAL_STATE__?.viewer.viewer)} />
    </React.StrictMode>,
  );
} else {
  createRoot(element).render(
    <React.StrictMode>
      <App store={createStore()} />
    </React.StrictMode>,
  );
}
