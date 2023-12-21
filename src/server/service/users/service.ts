import { prisma } from '#/server/context';
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
    return (trx || prisma).user.update({
      where: { id: data.id },
      select,
      data: {
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
