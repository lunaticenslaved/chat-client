import { PrismaClient } from '@prisma/client';

import { EventBus } from '#/server/context/event-bus';
import { IService } from '#/server/context/service';

export class BaseMetaService {
  protected service: IService;
  protected prisma: PrismaClient;
  protected eventBus: EventBus;

  constructor(prisma: PrismaClient, service: IService, eventBus: EventBus) {
    this.service = service;
    this.prisma = prisma;
    this.eventBus = eventBus;
  }
}
