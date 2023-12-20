import { prisma } from '#/server/context';
import { Transaction } from '#/server/shared/prisma';

import { BaseService } from '../base-service';

import {
  CreateOneToOneRequest,
  FindOneToOneConnectionRequest,
  GetConnectionRequest,
  ListConnectionsRequest,
} from './types';
import { Connection, OneToOneConnection, select } from './utils';

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

    const { oneToOneDialog, ...otherData } = connection;

    if (!oneToOneDialog) {
      throw new Error('Not one to one connection');
    }

    return { ...otherData, oneToOneDialog };
  }

  list(data: ListConnectionsRequest): Promise<Connection[]> {
    const { userId } = data;

    return prisma.connection.findMany({
      select,
      where: {
        users: {
          some: { id: { equals: userId } },
        },
      },
    });
  }

  get(data: GetConnectionRequest): Promise<Connection> {
    return prisma.connection.findFirstOrThrow({
      select,
      where: {
        id: data.connectionId,
      },
    });
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
      .then(data => data || undefined);
  }
}
