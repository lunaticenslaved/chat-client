import { eventBus, prisma } from '#/server/context';

import { MessagesService } from './service';

export * from './types';

export const messagesService = new MessagesService(prisma, eventBus);
