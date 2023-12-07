import { PrismaClient } from '@prisma/client';

import { createOperationWithContext } from '@/shared/operation';

import { IMetaService, createMetaServices } from './meta-service';
import { IService, createServices } from './service';

export interface Context {
  connectDB(): Promise<void>;
  service: IService;
  metaService: IMetaService;
}

const prisma = new PrismaClient();
const service = createServices(prisma);

export const context: Context = {
  service,
  metaService: createMetaServices(prisma, service),

  connectDB() {
    return prisma.$connect();
  },
};

export const createOperation = createOperationWithContext(context);
