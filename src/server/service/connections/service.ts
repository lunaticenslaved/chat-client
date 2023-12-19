import schema from '@lunaticenslaved/schema';
import { Errors } from '@lunaticenslaved/schema';

import { ConnectionType } from '#/domain/connection';
import { eventBus, prisma } from '#/server/context';
import { Connection, OneToOneConnection } from '#/server/models/connection';
import { IRequestContext } from '#/server/shared/operation';

import { BaseService } from '../base-service';

import {
  CreateOneToOneRequest,
  CreateOneToOneResponse,
  GetConnectionRequest,
  GetConnectionResponse,
  ListConnectionsRequest,
  ListConnectionsResponse,
} from './types';
import { SelectResponse, select } from './utils';

export class ConnectionsService extends BaseService {
  private async _processOneToOneConnection(
    requestContext: IRequestContext,
    connection: SelectResponse,
  ): Promise<OneToOneConnection> {
    if (!connection.oneToOneDialog) {
      throw new Error('No ono to one dialog');
    }

    const { id, oneToOneDialog, messages, users: usersLocal } = connection;

    const { users } = await schema.actions.users.list({
      token: requestContext.token,
      data: { userIds: usersLocal.map(({ id }) => id) },
      config: {
        headers: {
          Origin: requestContext.origin,
        },
      },
    });

    const lastMessage = messages.length ? messages[0] : undefined;
    const author = lastMessage ? users.find(user => user.id === lastMessage.authorId) : undefined;

    return {
      id,
      type: ConnectionType.OneToOne,
      users: [users[0], users[1]],
      oneToOneDialog: {
        id: oneToOneDialog.id,
      },
      lastMessage:
        // FIXME fix logic
        lastMessage && author
          ? {
              author,
              authorId: author.id,
              id: lastMessage.id,
              text: lastMessage.text,
              connectionId: lastMessage.connectionId,
              createdAt: lastMessage.createdAt.toISOString(),
              isRead: false,
              attachments: [],
            }
          : undefined,
    };
  }

  async createOneToOne(
    requestContext: IRequestContext,
    data: CreateOneToOneRequest,
  ): Promise<CreateOneToOneResponse> {
    const { partnerId, message } = data;
    const authorId = requestContext.userId;

    if (!authorId) {
      throw new Errors.UnauthorizedError({ messages: 'No user found' });
    }

    if (authorId === partnerId) {
      throw new Errors.ConflictError({ messages: 'User cannot send a message to self' });
    }

    return await prisma.$transaction(async trx => {
      const existingConnection = await trx.connection.findFirst({
        where: {
          oneToOneDialog: { isNot: null },
          users: {
            every: { id: { in: [authorId, partnerId] } },
          },
        },
      });

      const rawConnection = existingConnection
        ? await trx.connection.update({
            select,
            where: {
              id: existingConnection.id,
            },
            data: {
              messages: message ? { create: [{ text: message.text, authorId }] } : undefined,
            },
          })
        : await trx.connection.create({
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
              messages: message ? { create: [{ text: message.text, authorId }] } : undefined,
            },
          });

      const connection = await this._processOneToOneConnection(requestContext, rawConnection);

      if (!existingConnection) {
        eventBus.emit('connection-created', connection);
      }

      if (connection.lastMessage) {
        eventBus.emit('message-created', connection.lastMessage);
      }

      return connection;
    });
  }

  async list(
    requestContext: IRequestContext,
    data: ListConnectionsRequest,
  ): Promise<ListConnectionsResponse> {
    const connections: Connection[] = [];
    const { userId } = data;
    const rawConnections = await prisma.connection.findMany({
      select,
      where: {
        users: {
          some: { id: { equals: userId } },
        },
      },
    });

    for (const connection of rawConnections) {
      connections.push(await this._processOneToOneConnection(requestContext, connection));
    }

    return connections;
  }

  async get(
    requestContext: IRequestContext,
    data: GetConnectionRequest,
  ): Promise<GetConnectionResponse> {
    const rawConnection = await prisma.connection.findFirstOrThrow({
      select,
      where: {
        id: data.connectionId,
      },
    });

    return await this._processOneToOneConnection(requestContext, rawConnection);
  }
}
