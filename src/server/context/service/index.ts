import { PrismaClient } from '@prisma/client';

import { DialogService } from './dialog';
import { MessageService } from './message';

export interface IService {
  dialog: DialogService;
  message: MessageService;
}

export function createServices(prisma: PrismaClient): IService {
  return {
    dialog: new DialogService(prisma),
    message: new MessageService(prisma),
  };
}
