import express from 'express';

import fs from 'fs';
import path from 'path';

import { context } from '#/server/context';
import { addRoutes } from '#/server/controllers';
import { logger } from '#/server/shared';
import { PORT } from '#/server/shared/constants';

import { ROOT_PATH } from './constants';
import { addSSRRoute, addWebSocket, configureApp } from './utils';

const ASSETS_PATH = path.resolve(ROOT_PATH, 'dist/client/client/assets');
const HTML_FILE_PATH = path.resolve(ROOT_PATH, 'dist/client/client/index.html');
const STORE_FILE_PATH = path.resolve(ROOT_PATH, 'dist/store/index.js');
const RENDER_FILE_PATH = path.resolve(ROOT_PATH, 'dist/client/server/index.umd.js');

export async function createApp() {
  await context.connectDB();

  const app = express();

  configureApp(app);

  const server = app.listen(PORT, () => {
    logger.info(
      `  ➜ 🎸 [PROD] Server is listening on port: ${PORT}. Use this server: http://localhost:${PORT}`,
    );
  });

  addWebSocket(server, context);
  addRoutes(app);
  addSSRRoute({
    app,
    assetsFolder: ASSETS_PATH,
    getContent: () => fs.readFileSync(HTML_FILE_PATH, 'utf-8'),
    renderFn: (await import(RENDER_FILE_PATH)).render,
    createStore: (await import(STORE_FILE_PATH)).createStore,
  });
}
