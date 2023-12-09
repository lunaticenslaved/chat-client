import React, { ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { MessagesListener } from '#/client/entities/message';
import { constants } from '#/client/shared/constants';
import { SocketContext } from '#/client/shared/socket-context';
import '#/client/shared/styles/index.scss';
import '#/client/shared/token';
import { createStore } from '#/store';

import { App } from './app/app';

import 'antd/dist/reset.css';
import 'normalize.css';

const element = document.getElementById('root') as HTMLElement;

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <React.StrictMode>
      <SocketContext>
        <MessagesListener>
          <BrowserRouter>{children}</BrowserRouter>
        </MessagesListener>
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
