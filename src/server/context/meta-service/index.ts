import { PrismaClient } from '@prisma/client';

import { IService } from '@/context/service';

import { DialogsMetaService } from './dialog';

export interface IMetaService {
  dialog: DialogsMetaService;
}

export function createMetaServices(_: PrismaClient, services: IService): IMetaService {
  return {
    dialog: new DialogsMetaService(services),
  };
}
