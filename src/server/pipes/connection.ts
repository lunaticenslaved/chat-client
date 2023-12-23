import schema from '@lunaticenslaved/schema';

import { ConnectionType, Connection as DomainConnection } from '#/domain/connection';
import { Connection as ModelConnection } from '#/server/models/connection';
import {
  Connection as ServiceConnection,
  isGroupConnection,
  isOneToOneConnection,
} from '#/server/service/connections';
import { notReachable } from '#/shared/utils';

import { IRequestContext } from '../shared/operation';

class ConnectionsPipe {
  async fromServiceToModels(
    requestContext: IRequestContext,
    connection: ServiceConnection,
  ): Promise<ModelConnection> {
    if (isOneToOneConnection(connection)) {
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
                attachments: [],
                isReadByUsers: lastMessage.isReadByUsers,
              }
            : undefined,
      };
    } else if (isGroupConnection(connection)) {
      throw new Error('Not implemented');
    } else {
      notReachable(connection);
    }
  }

  async fromServiceToDomain(
    requestContext: IRequestContext,
    connection: ServiceConnection,
  ): Promise<DomainConnection> {
    if (isOneToOneConnection(connection)) {
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
      const partner = users.find(user => user.id !== requestContext.userId);

      if (!partner) {
        throw new Error('Partner not found');
      }

      return {
        id,
        type: ConnectionType.OneToOne,
        oneToOneDialog: {
          id: oneToOneDialog.id,
          partner,
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
                isReadByUsers: lastMessage.isReadByUsers,
                attachments: [],
              }
            : undefined,
      };
    } else if (isGroupConnection(connection)) {
      throw new Error('Not implemented');
    } else {
      notReachable(connection);
    }
  }
}

export const connectionsPipe = new ConnectionsPipe();
