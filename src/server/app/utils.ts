import { Express, Request } from 'express';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fs from 'fs';
import { Server } from 'http';
import { resolve } from 'path';
import { Server as WebSocketServer } from 'socket.io';

import { addHeaders, addUser, logRequest } from '@/middlewares';
import { logger } from '@/shared';

export function configureApp(app: Express) {
  app.disable('x-powered-by');
  app.disable('via');

  app.use(cookieParser());
  // FIXME: set no cross origin
  app.use(
    cors({
      credentials: true,
      origin: ['*'],
    }),
  );
  app.use(logRequest);
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
    logger.info('GET HTML');

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

export function addWebSocket(server: Server) {
  console.log('ADD WEB SOCKET');

  const wsServer = new WebSocketServer(server);

  // io.use(async (socket, next) => {
  //   try {
  //     const token = socket.handshake.auth.token;

  //     // Verify and decode the JWT
  //     const decoded = jwt.verify(token, process.env.SECRET_KEY);

  //     // Get the user information from the database
  //     const user = await User.findById(decoded.userId);
  //     if (!user) {
  //       throw new Error('User not found');
  //     }

  //     // Attach the user object to the socket
  //     socket.user = user;
  //     next();
  //   } catch (error) {
  //     console.error('Authentication error', error);
  //     next(new Error('Authentication error'));
  //   }
  // });

  wsServer.on('connection', () => {
    logger.info(`[SOCKET] User connected`);
  });
}
