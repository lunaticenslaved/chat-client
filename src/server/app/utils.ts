import { Express, Request } from 'express';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fs from 'fs';
import { resolve } from 'path';

import { addHeaders, addUser } from '@/middlewares';

export function configureApp(app: Express) {
  app.disable('x-powered-by');
  app.disable('via');

  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: ['*'],
    }),
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(addHeaders);
}

type RenderHTMLProps = {
  app: Express;
  renderFn: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  getContent(url: string): Promise<string> | string;
  createStore(args?: unknown): any; // eslint-disable-line @typescript-eslint/no-explicit-any
  onError?(error: Error): void;
  assetsFolder?: string;
};

export function addSSRRoute({
  app,
  getContent,
  onError,
  renderFn,
  createStore,
  assetsFolder,
}: RenderHTMLProps) {
  let staticFiles: string[] = [];

  if (assetsFolder) {
    fs.readdir(assetsFolder, (err, files) => {
      if (!err) {
        staticFiles = files;
      } else {
        console.error('Ошибка при чтении папки:', err);
      }
    });
  }

  app.use('*', addUser, async (req: Request, res, next) => {
    console.log('GET HTML');
    console.log('HEADERS\n', req.headers);

    try {
      const filePath = staticFiles.find(file => req.baseUrl.endsWith(file));

      if (filePath && assetsFolder) {
        res.sendFile(resolve(assetsFolder, filePath));
        return;
      }

      const url = req.originalUrl;
      const user = req.user;
      const store = user ? createStore(user) : createStore();
      const appHtml = await renderFn(url, store);
      const content = await getContent(url);

      const storeIncrementHtml = `
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())};
          window.__IS_SSR__ = true
        </script>`;
      const html = content
        .replace(`<!-- ssr-outlet -->`, appHtml)
        .replace(`<!-- store-outlet -->`, storeIncrementHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (onError) {
        onError(e as Error);
      }

      next(e);
    }
  });
}
