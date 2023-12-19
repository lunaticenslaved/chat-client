import { PrismaClient } from '@prisma/client';

import { EventBus } from '#/server/context/event-bus';

export class BaseService {
  protected prisma: PrismaClient;
  protected eventBus: EventBus;

  constructor(prisma: PrismaClient, eventBus: EventBus) {
    this.prisma = prisma;
    this.eventBus = eventBus;
  }
}
