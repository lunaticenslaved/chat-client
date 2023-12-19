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

export class UsersService extends BaseService {
  createUser(data: CreateUserRequest, trx?: Transaction): Promise<CreateUserResponse> {
    return (trx || this.prisma).user.create({
      select: {
        id: true,
        isOnline: true,
        sockets: true,
      },
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
    return (trx || this.prisma).user.update({
      where: { id: data.id },
      select: {
        id: true,
        isOnline: true,
        sockets: true,
      },
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
    return this.prisma.$transaction(async trx => {
      const existingUser = await this.findUser(data, trx);

      if (existingUser) {
        return this.updateUser(data, trx);
      } else {
        return this.createUser(data, trx);
      }
    });
  }

  findUser(data: FindUserRequest, trx?: Transaction): Promise<FindUserResponse> {
    return (trx || this.prisma).user
      .findFirst({
        where: { id: data.id },
        select: {
          id: true,
          isOnline: true,
          sockets: true,
        },
      })
      .then(user => user || undefined);
  }

  async removeSocket(data: RemoveSocketRequest): Promise<RemoveSocketResponse> {
    await this.prisma.socket.deleteMany({
      where: {
        id: data.socketId,
      },
    });
  }
}
