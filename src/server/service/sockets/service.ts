import { prisma } from '#/server/context';

import { BaseService } from '../base-service';

import { Socket, select } from './utils';

export class SocketsService extends BaseService {
  getSocketsForUser(userId: string): Promise<Socket[]> {
    return prisma.socket.findMany({
      select,
      where: { userId },
    });
  }

  getUserForSocket(socketId: string): Promise<string | undefined> {
    return prisma.user
      .findFirst({
        select: { id: true },
        where: {
          sockets: { some: { id: socketId } },
        },
      })
      .then(user => user?.id);
  }
}
