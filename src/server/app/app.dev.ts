import express from 'express';

import fs from 'fs';
import path from 'path';

import { context } from '@/context';
import { addRoutes } from '@/controllers';
import { constants } from '@/shared';

import { ROOT_PATH } from './constants';
import { addSSRRoute, configureApp } from './utils';

const { PORT } = constants;

const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const CLIENT_RENDER_FILE_PATH = path.resolve(SRC_PATH, 'client/index.server');
const CLIENT_STORE_FILE_PATH = path.resolve(SRC_PATH, 'common/store');
const CLIENT_HTML_FILE_PATH = path.resolve(ROOT_PATH, 'index.html');

export async function createApp() {
  await context.connectDB();

  const vite = await import('vite');

  const app = express();
  const viteServer = await vite.createServer({
    root: ROOT_PATH,
    appType: 'custom',
    configFile: 'vite.client.config.ts',
    server: {
      middlewareMode: true,
      hmr: {
        protocol: 'http',
        host: 'localhost',
      },
    },
  });

  app.use(viteServer.middlewares);

  configureApp(app);

  addRoutes(app);

  addSSRRoute({
    app,
    getContent: async url =>
      viteServer.transformIndexHtml(url, fs.readFileSync(CLIENT_HTML_FILE_PATH, 'utf-8')),
    renderFn: (await viteServer.ssrLoadModule(CLIENT_RENDER_FILE_PATH)).render,
    onError: viteServer.ssrFixStacktrace,
    createStore: (await viteServer.ssrLoadModule(CLIENT_STORE_FILE_PATH)).createStore,
  });

  app.listen(PORT, () => {
    console.log(
      `  ➜ 🎸 [DEV] Server is listening on port: ${PORT}. Use this server: http://localhost:${PORT}`,
    );
  });
}
