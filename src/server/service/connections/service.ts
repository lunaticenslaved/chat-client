import { prisma } from '#/server/context';
import { Transaction } from '#/server/shared/prisma';
import { notReachable } from '#/shared/utils';

import { BaseService } from '../base-service';

import {
  CanSendMessageToConnectionRequest,
  CreateOneToOneRequest,
  FindOneToOneConnectionRequest,
  GetConnectionRequest,
  ListConnectionsRequest,
} from './types';
import {
  Connection,
  OneToOneConnection,
  isGroupConnection,
  isOneToOneConnection,
  select,
} from './utils';

export class ConnectionsService extends BaseService {
  async createOneToOne(
    data: CreateOneToOneRequest,
    trx?: Transaction,
  ): Promise<OneToOneConnection> {
    const { partnerId, authorId } = data;

    const connection = await (trx || prisma).connection.create({
      select,
      data: {
        users: {
          connectOrCreate: [
            {
              where: { id: partnerId },
              create: { id: partnerId },
            },
            {
              where: { id: authorId },
              create: { id: authorId },
            },
          ],
        },
        oneToOneDialog: { create: {} },
      },
    });

    const { oneToOneDialog, ...otherData } = connection as unknown as Connection;

    if (!oneToOneDialog) {
      throw new Error('Not one to one connection');
    }

    return { ...otherData, oneToOneDialog };
  }

  list(data: ListConnectionsRequest): Promise<Connection[]> {
    const { userId } = data;

    return prisma.connection
      .findMany({
        select,
        where: {
          users: {
            some: { id: { equals: userId } },
          },
        },
      })
      .then(data => data as unknown as Connection[]);
  }

  get(data: GetConnectionRequest, trx?: Transaction): Promise<Connection> {
    return (trx || prisma).connection
      .findFirstOrThrow({
        select,
        where: {
          id: data.connectionId,
        },
      })
      .then(data => data as unknown as Connection);
  }

  findOneToOne(
    { userId1, userId2 }: FindOneToOneConnectionRequest,
    trx?: Transaction,
  ): Promise<Connection | undefined> {
    return (trx || prisma).connection
      .findFirst({
        select,
        where: {
          users: {
            none: { id: { notIn: [userId1, userId2] } },
          },
        },
      })
      .then(data => (data || undefined) as unknown as Connection);
  }

  canSendMessageToConnection({
    connectionId,
    userId,
  }: CanSendMessageToConnectionRequest): Promise<boolean> {
    return prisma.$transaction(async trx => {
      const connection = await this.get({ connectionId }, trx);

      if (isOneToOneConnection(connection)) {
        return trx.connection
          .findFirst({
            where: {
              id: connectionId,
              users: {
                every: {
                  blockedUsers: { none: { id: userId } },
                  usersWhoBlockedMe: { none: { id: userId } },
                },
              },
            },
          })
          .then(data => !!data);
      } else if (isGroupConnection(connection)) {
        throw new Error('Not implemented');
      } else {
        notReachable(connection);
      }
    });
  }
}
