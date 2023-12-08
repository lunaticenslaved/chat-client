import React, { ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { createStore } from '@store';

import { constants } from '@/shared/constants';
import { SocketContext } from '@/shared/socket-context';
import '@/shared/styles/index.scss';
import '@/shared/token';

import { App } from './app/app';

import 'antd/dist/reset.css';
import 'normalize.css';

const element = document.getElementById('root') as HTMLElement;

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <React.StrictMode>
      <SocketContext>
        <BrowserRouter>{children}</BrowserRouter>
      </SocketContext>
    </React.StrictMode>
  );
}

if (constants.IS_SSR) {
  hydrateRoot(
    element,
    <Wrapper>
      <App store={createStore(window.__INITIAL_STATE__?.viewer.viewer)} />
    </Wrapper>,
  );
} else {
  createRoot(element).render(
    <Wrapper>
      <App store={createStore()} />
    </Wrapper>,
  );
}
