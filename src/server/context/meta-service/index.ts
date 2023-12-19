import { PrismaClient } from '@prisma/client';

import { EventBus } from '../event-bus';
import { IService } from '../service';

import { MessagesMetaService } from './message';

export interface IMetaService {
  message: MessagesMetaService;
}

export function createMetaServices(
  prisma: PrismaClient,
  services: IService,
  eventBus: EventBus,
): IMetaService {
  return {
    message: new MessagesMetaService(prisma, services, eventBus),
  };
}
