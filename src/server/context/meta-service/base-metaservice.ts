import { PrismaClient } from '@prisma/client';

import { IService } from '#/server/context/service';

export class BaseMetaService {
  protected service: IService;
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient, service: IService) {
    this.service = service;
    this.prisma = prisma;
  }
}
