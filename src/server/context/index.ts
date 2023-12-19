import { PrismaClient } from '@prisma/client';
import { Server as SocketServer } from 'socket.io';

import {
  createOperationWithContext,
  createSocketOperationWithContext,
} from '#/server/shared/operation';
import { SocketByUser } from '#/server/shared/socket';

import { eventBus } from './event-bus';
import { IMetaService, createMetaServices } from './meta-service';
import { IService, createServices } from './service';
import { ISocketEvent, createSocketEvents } from './socket';

export { RequestContext } from './rest-context';
export { SocketContext } from './socket-context';
export { eventBus } from './event-bus';

export interface IContext {
  service: IService;
  metaService: IMetaService;
  socketEvent: ISocketEvent;
  socketMap: SocketByUser;
  socketServer: SocketServer;

  connectDB(): Promise<void>;
  addUserToConnection(data: AddUserToConnectionRequest): void;
}

export const prisma = new PrismaClient();
const service = createServices(prisma);

type AddUserToConnectionRequest = {
  userId: string;
  connectionId: string;
};

export class Context implements IContext {
  prisma = prisma;
  eventBus = eventBus;
  service: IService;
  metaService: IMetaService;
  socketEvent: ISocketEvent;
  socketMap: SocketByUser;
  socketServer: SocketServer;

  constructor() {
    this.service = service;
    this.metaService = createMetaServices(prisma, service, this.eventBus);
    this.socketEvent = createSocketEvents(this);
    this.socketMap = new SocketByUser();
    this.socketServer = new SocketServer();
  }

  addUserToConnection(data: AddUserToConnectionRequest): void {
    const { connectionId, userId } = data;
    const socketId = this.socketMap.getSocketId(userId);

    if (!socketId) return;

    const namespace = this.socketServer.of('/');
    const socket = namespace.sockets.get(socketId);

    if (!socket) return;

    socket.join(connectionId);
  }

  connectDB() {
    return prisma.$connect();
  }
}

export const context = new Context();

export const createOperation = createOperationWithContext(context);
export const createSocketOperation = createSocketOperationWithContext(context);
