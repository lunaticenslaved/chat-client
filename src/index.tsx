import React from 'react';
import ReactDOM from 'react-dom/client';

import schema from '@lunaticenslaved/schema';

import { App } from '@/app';
import { constants } from '@/shared/constants';
import '@/shared/styles/index.scss';

import 'antd/dist/reset.css';

if (constants.AUTH_SERVER_URL) {
  schema.client.endpoints.setHost('authApi', constants.AUTH_SERVER_URL);
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
