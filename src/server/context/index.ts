import { PrismaClient } from '@prisma/client';

import { createOperationWithContext } from '@/shared/operation';

import { IService, createServices } from './service';

export interface Context {
  connectDB(): Promise<void>;
  service: IService;
}

const prisma = new PrismaClient();

export const context: Context = {
  service: createServices(prisma),

  connectDB() {
    return prisma.$connect();
  },
};

export const createOperation = createOperationWithContext(context);
