import { Socket } from 'socket.io';

import { ISocketContext } from '#/server/shared/operation';

type SocketContextConstructor = {
  socket: Socket;
  origin: string;
  userId?: string;
  token?: string;
};

export class SocketContext implements ISocketContext {
  socket: Socket;
  origin: string;
  userId?: string;
  token?: string;

  constructor(data: SocketContextConstructor) {
    this.socket = data.socket;
    this.origin = data.origin;
    this.userId = data.userId;
    this.token = data.token;
  }

  getUserIdStrict(): string {
    if (!this.userId) {
      throw new Error('User id not found');
    }

    return this.userId;
  }
}
