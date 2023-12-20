import { PrismaClient } from '@prisma/client';
import { Server as SocketServer } from 'socket.io';

import { socketsService } from '#/server/service/sockets';
import {
  createOperationWithContext,
  createSocketOperationWithContext,
} from '#/server/shared/operation';

import { ISocketEvent, createSocketEvents } from './socket';

export { RequestContext } from './rest-context';
export { SocketContext } from './socket-context';

export interface IContext {
  socketEvent: ISocketEvent;
  socketServer: SocketServer;

  connectDB(): Promise<void>;
  addUserToConnection(data: AddUserToConnectionRequest): void;
}

export const prisma = new PrismaClient();

type AddUserToConnectionRequest = {
  userId: string;
  connectionId: string;
};

export class Context implements IContext {
  prisma = prisma;
  socketEvent: ISocketEvent;
  socketServer: SocketServer;

  constructor() {
    this.socketEvent = createSocketEvents(this);
    this.socketServer = new SocketServer();
  }

  async addUserToConnection(data: AddUserToConnectionRequest): Promise<void> {
    const { connectionId, userId } = data;

    const sockets = await socketsService.getSocketsForUser(userId);

    for (const { id: socketId } of sockets) {
      const namespace = this.socketServer.of('/');
      const socket = namespace.sockets.get(socketId);

      if (!socket) return;

      socket.join(connectionId);
    }
  }

  connectDB() {
    return prisma.$connect();
  }
}

export const context = new Context();

export const createOperation = createOperationWithContext(context);
export const createSocketOperation = createSocketOperationWithContext(context);
