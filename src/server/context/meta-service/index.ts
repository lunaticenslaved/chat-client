import { PrismaClient } from '@prisma/client';

import { IService } from '@/context/service';

import { DialogsMetaService } from './dialog';

export interface IMetaService {
  dialog: DialogsMetaService;
}

export function createMetaServices(prisma: PrismaClient, services: IService): IMetaService {
  return {
    dialog: new DialogsMetaService(prisma, services),
  };
}
