import { Express } from 'express';

import { ISocketContext } from '#/server/shared/operation';

export const createRoutes = (fn: (app: Express) => void) => (app: Express) => {
  fn(app);
};

export const createSocketEvents =
  (fn: (socketContext: ISocketContext) => void) => (socketContext: ISocketContext) => {
    fn(socketContext);
  };
