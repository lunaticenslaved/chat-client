import schema from '@lunaticenslaved/schema';

import { SearchInChannelsRequest, SearchInChannelsResponse } from '#/api/search';
import { ConnectionType } from '#/domain/connection';
import { createOperation } from '#/server/context';
import { connectionsPipe } from '#/server/pipes/connection';
import { connectionsService } from '#/server/service/connections';
import { SERVICE } from '#/server/shared/constants';
import { notReachable } from '#/shared/utils';

export const searchInChannels = createOperation<SearchInChannelsResponse, SearchInChannelsRequest>(
  async (req, requestContext) => {
    const { search } = req.body;
    const userId = requestContext.userId;

    if (!userId) {
      // FIXME add function to request context to get user id strict
      throw new Error('User id not found');
    }

    const connections = await connectionsService.list({ userId });

    const oneToOneUsers: string[] = [];
    connections.forEach(connection => {
      if (connection.oneToOneDialog) {
        oneToOneUsers.push(
          ...connection.users.filter(user => user.id !== userId).map(user => user.id),
        );
      }
    });

    const { users: usersForConnection } = await schema.actions.users.list({
      data: { take: 20, search, services: [SERVICE], userIds: oneToOneUsers, excludeIds: [userId] },
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
      users: users,
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
