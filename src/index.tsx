import React from 'react';
import ReactDOM from 'react-dom/client';

import { Endpoint } from '@lunaticenslaved/schema';

import { App } from '@/app';
import { IS_DEV } from '@/shared/constants';
import '@/shared/styles/index.scss';

import 'antd/dist/reset.css';

if (IS_DEV) {
  Endpoint.set('authApi', 'http://localhost:4000/api');
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
