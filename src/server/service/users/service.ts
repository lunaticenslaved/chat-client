import { prisma } from '#/server/context';
import { logger } from '#/server/shared';
import { Transaction } from '#/server/shared/prisma';

import { BaseService } from '../base-service';

import {
  BlockUserRequest,
  CreateOrUpdateUserRequest,
  CreateOrUpdateUserResponse,
  CreateUserRequest,
  CreateUserResponse,
  FindUserRequest,
  FindUserResponse,
  RemoveSocketRequest,
  RemoveSocketResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from './types';
import { User, select } from './utils';

export class UsersService extends BaseService {
  createUser(data: CreateUserRequest, trx?: Transaction): Promise<CreateUserResponse> {
    return (trx || prisma).user.create({
      select,
      data: {
        id: data.id,
        isOnline: data.isOnline || false,
        sockets: data.socketId
          ? {
              connectOrCreate: {
                where: { id: data.socketId },
                create: { id: data.socketId },
              },
            }
          : undefined,
      },
    });
  }

  updateUser(data: UpdateUserRequest, trx?: Transaction): Promise<UpdateUserResponse> {
    // FIXME why user not updated without logger???
    logger.debug(`UPDATE USER ${JSON.stringify(data, null, 2)}`);
    return (trx || prisma).user
      .update({
        select,
        where: { id: data.id },
        data: {
          isOnline: { set: data.isOnline || false },
          sockets: data.socketId
            ? {
                connectOrCreate: {
                  where: { id: data.socketId },
                  create: { id: data.socketId },
                },
              }
            : undefined,
        },
      })
      .then(data => {
        console.log(data);
        logger.debug(`UPDATED USER ${JSON.stringify(data, null, 2)}`);

        return data;
      });
  }

  createOrUpdate(data: CreateOrUpdateUserRequest): Promise<CreateOrUpdateUserResponse> {
    return prisma.$transaction(async trx => {
      const existingUser = await this.findUser(data, trx);

      if (existingUser) {
        return this.updateUser(data, trx);
      } else {
        return this.createUser(data, trx);
      }
    });
  }

  findUser(data: FindUserRequest, trx?: Transaction): Promise<FindUserResponse> {
    return (trx || prisma).user
      .findFirst({
        select,
        where: { id: data.id },
      })
      .then(user => user || undefined);
  }

  async removeSocket(data: RemoveSocketRequest): Promise<RemoveSocketResponse> {
    await prisma.socket.deleteMany({
      where: {
        id: data.socketId,
      },
    });
  }

  async blockUser({ userId, ownerId }: BlockUserRequest): Promise<void> {
    await prisma.user.update({
      where: {
        id: ownerId,
      },
      data: {
        blockedUsers: { connect: { id: userId } },
      },
    });
  }

  async unblockUser({ userId, ownerId }: BlockUserRequest): Promise<void> {
    await prisma.user.update({
      where: {
        id: ownerId,
      },
      data: {
        blockedUsers: { disconnect: { id: userId } },
      },
    });
  }

  listOnlineUsers(userId: string): Promise<User[]> {
    return prisma.user.findMany({
      where: {
        id: { not: userId },
        isOnline: true,
        connections: {
          some: {
            users: {
              some: { id: userId },
            },
            oneToOneDialog: { isNot: null },
          },
        },
      },
    });
  }

  listBlockedUsers(userId: string): Promise<User[]> {
    return prisma.user.findMany({
      select,
      where: {
        usersWhoBlockedMe: { some: { id: userId } },
      },
    });
  }

  listUsersWhoBlockedMe(userId: string): Promise<User[]> {
    return prisma.user.findMany({
      select,
      where: {
        blockedUsers: { some: { id: userId } },
      },
    });
  }
}
