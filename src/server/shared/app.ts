import { Express } from 'express';

import { Socket } from 'socket.io';

export const createRoutes = (fn: (app: Express) => void) => (app: Express) => {
  fn(app);
};

export const createSocketEvents = (fn: (socket: Socket) => void) => (socket: Socket) => {
  fn(socket);
};
