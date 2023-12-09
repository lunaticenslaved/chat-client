import { PrismaClient } from '@prisma/client';

import { IService } from '#/server/context/service';

import { DialogsMetaService } from './dialog';
import { MessagesMetaService } from './message';

export interface IMetaService {
  dialog: DialogsMetaService;
  message: MessagesMetaService;
}

export function createMetaServices(_: PrismaClient, services: IService): IMetaService {
  return {
    dialog: new DialogsMetaService(services),
    message: new MessagesMetaService(services),
  };
}
