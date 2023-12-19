import schema from '@lunaticenslaved/schema';

import { SearchInChannelsRequest, SearchInChannelsResponse } from '#/api/search';
import { ConnectionType } from '#/domain/connection';
import { createOperation } from '#/server/context';
import { prepareConnectionToSend } from '#/server/models/connection';
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

    const connections = await connectionsService.list(requestContext, {
      userId,
    });

    const excludeUsers: string[] = [];
    connections.forEach(connection => {
      if (connection.type === ConnectionType.OneToOne) {
        excludeUsers.push(
          ...connection.users.filter(user => user.id !== userId).map(user => user.id),
        );
      }
    });

    const { users } = await schema.actions.users.list({
      data: { take: 20, search, services: [SERVICE], excludeIds: excludeUsers },
      token: requestContext.token,
      config: {
        headers: {
          Origin: requestContext.origin,
        },
      },
    });

    return {
      users: users,
      connections: connections
        .map(connection => {
          if (connection.type === ConnectionType.OneToOne) {
            return prepareConnectionToSend(userId, connection);
          } else if (connection.type === ConnectionType.Group) {
            throw new Error('Not implemented');
          } else {
            notReachable(connection);
          }
        })
        .filter(connection => {
          if (connection.type === ConnectionType.OneToOne) {
            const { login, email } = connection.oneToOneDialog.partner;
            return (
              login.toLowerCase().includes(search.toLowerCase()) ||
              email.toLowerCase().includes(search.toLowerCase())
            );
          } else if (connection.type === ConnectionType.Group) {
            throw new Error('Not implemented');
          } else {
            notReachable(connection);
          }
        }),
    };
  },
);
