import { eventBus, prisma } from '#/server/context';

import { ConnectionsService } from './service';

export * from './types';

export const connectionsService = new ConnectionsService(prisma, eventBus);
