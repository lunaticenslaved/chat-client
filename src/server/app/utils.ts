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

import { SocketContext } from '#/server/context';
import { addSocketEvents } from '#/server/controllers';
import { addHeaders, addUser, logRequest } from '#/server/middlewares';
import { socketsService } from '#/server/service/sockets';
import { usersService } from '#/server/service/users';
import { logger } from '#/server/shared';
import { SERVICE } from '#/server/shared/constants';

import { AuthEventServer } from '../../api/auth/types';
import { SocketServer } from '../socket-server';

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
  app.use(logRequest);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(addHeaders);

  app.use(addUser);
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
        data: { service: SERVICE },
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

export function addWebSocket(server: Server): WebSocketServer {
  const wsServer = new WebSocketServer(server);

  SocketServer.server = wsServer;

  wsServer.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    const { origin } = socket.handshake.headers;

    try {
      const { user } = await schema.actions.auth.validateRequest({
        token,
        data: { service: SERVICE },
        config: { headers: { origin } },
      });

      await usersService.createOrUpdate({
        id: user.id,
        socketId: socket.id,
        isOnline: true,
      });

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
    const userId = await socketsService.getUserForSocket(socket.id);

    socket.on('disconnect', () => {
      if (userId) {
        SocketServer.onUserDisconnected(socket, userId);
      }
    });

    if (userId) {
      SocketServer.onUserConnected(socket, userId);
    }

    const eventContext = new SocketContext({
      socket,
      userId,
      token: socket.handshake.auth.token,
      origin: socket.request.headers.origin || '',
    });

    addSocketEvents(eventContext);
  });

  return wsServer;
}
