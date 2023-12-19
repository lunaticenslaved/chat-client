import { prisma } from '#/server/context';
import { Transaction } from '#/server/shared/prisma';

import { BaseService } from '../base-service';

import {
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
import { select } from './utils';

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
}
