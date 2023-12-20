import { PrismaClient } from '@prisma/client';

import {
  createOperationWithContext,
  createSocketOperationWithContext,
} from '#/server/shared/operation';

export { RequestContext } from './rest-context';
export { SocketContext } from './socket-context';

export interface IContext {
  connectDB(): Promise<void>;
}

export const prisma = new PrismaClient();

export function connectDB() {
  return prisma.$connect();
}

export const createOperation = createOperationWithContext();
export const createSocketOperation = createSocketOperationWithContext();
