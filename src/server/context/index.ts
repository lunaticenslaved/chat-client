import { PrismaClient } from '@prisma/client';

import {
  createOperationWithContext,
  createSocketOperationWithContext,
} from '#/server/shared/operation';

import { IMetaService, createMetaServices } from './meta-service';
import { IService, createServices } from './service';
import { ISocketEvent, createSocketEvents } from './socket';

export interface Context {
  connectDB(): Promise<void>;
  service: IService;
  metaService: IMetaService;
  socketEvent: ISocketEvent;
}

const prisma = new PrismaClient();
const service = createServices(prisma);

export const context: Context = {
  service,
  metaService: createMetaServices(prisma, service),
  socketEvent: createSocketEvents(),

  connectDB() {
    return prisma.$connect();
  },
};

export const createOperation = createOperationWithContext(context);
export const createSocketOperation = createSocketOperationWithContext(context);
