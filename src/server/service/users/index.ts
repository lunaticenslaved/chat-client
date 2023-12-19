import { eventBus, prisma } from '#/server/context';

import { UsersService } from './service';

export * from './types';

export const usersService = new UsersService(prisma, eventBus);
