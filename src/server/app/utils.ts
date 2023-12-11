import { Express, Request } from 'express';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fs from 'fs';
import { Server } from 'http';
import { resolve } from 'path';
import { Server as WebSocketServer } from 'socket.io';

import schema, { Errors } from '@lunaticenslaved/schema';
import { AuthResponse } from '@lunaticenslaved/schema/dist/types/actions';

import { Context } from '#/server/context';
import { addSocketEvents } from '#/server/controllers';
import { addHeaders, logRequest } from '#/server/middlewares';
import { logger } from '#/server/shared';

import { AuthEventServer } from '../../api/auth/types';

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

  app.use('*', async (req: Request, res, next) => {
    logger.info('[GET HTML] Start');

    let validatedRequest: AuthResponse | undefined;

    try {
      validatedRequest = await schema.actions.auth.validateRequest({
        data: undefined,
        config: {
          headers: {
            Origin: req.headers.origin,
            Cookie: req.headers.cookie,
          },
        },
      });

      logger.info('[GET HTML] Request validated');
    } catch {
      logger.info('[GET HTML] User not found');
    }

    try {
      const filePath = staticFiles.find(file => req.baseUrl.endsWith(file));

      if (filePath && assetsFolder) {
        res.sendFile(resolve(assetsFolder, filePath));
        return;
      }

      const url = req.originalUrl;
      const store = createStore(validatedRequest?.user);
      const appHtml = await renderFn(url, store);
      const content = await getContent(url);

      const storeIncrementHtml = `
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())};
          window.__IS_SSR__ = true;

          (function() {
            localStorage.setItem("token", "${validatedRequest?.token || ''}");
            localStorage.setItem("expiresAt", "${validatedRequest?.expiresAt || ''}");
          })();
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

export function addWebSocket(server: Server, context: Context): WebSocketServer {
  const wsServer = new WebSocketServer(server);

  context.socketServer = wsServer;

  wsServer.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    const { origin } = socket.handshake.headers;

    try {
      const { user } = await schema.actions.auth.validateRequest({
        token,
        data: undefined,
        config: { headers: { origin } },
      });

      socket.join(user.id);
      context.socketMap.addUser({ userId: user.id, socketId: socket.id });

      logger.info('[MIDDLEWARE][SOCKET] User found');

      next();
    } catch (error) {
      console.log('error', error);
      logger.warn('[MIDDLEWARE][SOCKET] User not found');

      if (error instanceof Errors.TokenExpiredError) {
        logger.warn('[MIDDLEWARE][SOCKET] Token expired');
        socket.emit(AuthEventServer.ExpiredToken);
      } else {
        logger.warn('[MIDDLEWARE][SOCKET] Token invalid');
        socket.emit(AuthEventServer.InvalidToken);
      }

      socket.disconnect();

      next();
    }
  });

  wsServer.on('connection', async socket => {
    socket.on('disconnect', () => {
      const userId = context.socketMap.getUserId(socket.id);

      if (userId) {
        socket.leave(userId);
      }

      console.log('USER DISCONNECTED');
    });

    addSocketEvents(socket);
  });

  return wsServer;
}
