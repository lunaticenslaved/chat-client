import { PrismaClient } from '@prisma/client';
import { Server as SocketServer } from 'socket.io';

import {
  createOperationWithContext,
  createSocketOperationWithContext,
} from '#/server/shared/operation';
import { SocketByUser } from '#/server/shared/socket';

import { IMetaService, createMetaServices } from './meta-service';
import { IService, createServices } from './service';
import { ISocketEvent, createSocketEvents } from './socket';

export interface IContext {
  connectDB(): Promise<void>;
  service: IService;
  metaService: IMetaService;
  socketEvent: ISocketEvent;
  socketMap: SocketByUser;
  socketServer: SocketServer;
}

const prisma = new PrismaClient();
const service = createServices(prisma);

export class Context implements IContext {
  service: IService;
  metaService: IMetaService;
  socketEvent: ISocketEvent;
  socketMap: SocketByUser;
  socketServer: SocketServer;

  constructor() {
    this.service = service;
    this.metaService = createMetaServices(prisma, service);
    this.socketEvent = createSocketEvents(this);
    this.socketMap = new SocketByUser();
    this.socketServer = new SocketServer();
  }

  connectDB() {
    return prisma.$connect();
  }
}

export const context = new Context();

export const createOperation = createOperationWithContext(context);
export const createSocketOperation = createSocketOperationWithContext(context);
