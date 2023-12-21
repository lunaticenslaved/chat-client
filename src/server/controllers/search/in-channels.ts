import schema from '@lunaticenslaved/schema';

import { SearchInChannelsRequest, SearchInChannelsResponse } from '#/api/search';
import { ConnectionType } from '#/domain/connection';
import { createOperation } from '#/server/context';
import { connectionsPipe } from '#/server/pipes/connection';
import {
  connectionsService,
  isGroupConnection,
  isOneToOneConnection,
} from '#/server/service/connections';
import { SERVICE } from '#/server/shared/constants';
import { notReachable } from '#/shared/utils';

export const searchInChannels = createOperation<SearchInChannelsResponse, SearchInChannelsRequest>(
  async ({ search }, requestContext) => {
    const userId = requestContext.getUserIdStrict();
    const connections = await connectionsService.list({ userId });

    const oneToOneUsers: string[] = [];
    connections.forEach(connection => {
      if (isOneToOneConnection(connection)) {
        oneToOneUsers.push(
          ...connection.users.filter(user => user.id !== userId).map(user => user.id),
        );
      } else if (isGroupConnection(connection)) {
        throw new Error('not implemented');
      } else {
        notReachable(connection);
      }
    });

    const { users: usersForConnection } = await schema.actions.users.list({
      data: {
        search,
        services: [SERVICE],
        userIds: oneToOneUsers,
      },
      token: requestContext.token,
      config: {
        headers: {
          Origin: requestContext.origin,
        },
      },
    });

    const { users } = await schema.actions.users.list({
      data: { take: 20, search, services: [SERVICE], excludeIds: oneToOneUsers },
      token: requestContext.token,
      config: {
        headers: {
          Origin: requestContext.origin,
        },
      },
    });

    return {
      users,
      connections: await Promise.all(
        connections.map(connection =>
          connectionsPipe.fromServiceToDomain(requestContext, connection),
        ),
      ).then(connections =>
        connections.filter(connection => {
          if (connection.type === ConnectionType.OneToOne) {
            return !!usersForConnection.find(
              user => user.id === connection.oneToOneDialog.partner.id,
            );
          } else if (connection.type === ConnectionType.Group) {
            throw new Error('Not implemented');
          } else {
            notReachable(connection);
          }
        }),
      ),
    };
  },
);
