import { PrismaClient } from '@prisma/client';

import { EventBus } from '../event-bus';
import { IService } from '../service';

import { ConnectionMetaService } from './connection';
import { MessagesMetaService } from './message';

export interface IMetaService {
  message: MessagesMetaService;
  connection: ConnectionMetaService;
}

export function createMetaServices(
  prisma: PrismaClient,
  services: IService,
  eventBus: EventBus,
): IMetaService {
  return {
    message: new MessagesMetaService(prisma, services, eventBus),
    connection: new ConnectionMetaService(prisma, services, eventBus),
  };
}
