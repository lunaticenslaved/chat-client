import { PrismaClient } from '@prisma/client';

import { IService } from '#/server/context/service';

import { ConnectionMetaService } from './connection';
import { MessagesMetaService } from './message';

export interface IMetaService {
  message: MessagesMetaService;
  connection: ConnectionMetaService;
}

export function createMetaServices(prisma: PrismaClient, services: IService): IMetaService {
  return {
    message: new MessagesMetaService(prisma, services),
    connection: new ConnectionMetaService(prisma, services),
  };
}
