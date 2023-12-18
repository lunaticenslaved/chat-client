import schema from '@lunaticenslaved/schema';

import { SearchInChannelsRequest, SearchInChannelsResponse } from '#/api/search';
import { ConnectionType } from '#/domain/connection';
import { createOperation } from '#/server/context';
import { prepareConnectionToSend } from '#/server/models/connection';

export const searchInChannels = createOperation<SearchInChannelsResponse, SearchInChannelsRequest>(
  async (req, requestContext, context) => {
    const { search } = req.body;
    const userId = requestContext.userId;

    if (!userId) {
      // FIXME add function to request context to get user id strict
      throw new Error('User id not found');
    }

    // FIXME search in connections not work
    const connections = await context.metaService.connection.list(requestContext, {
      userId,
    });

    const { users } = await schema.actions.users.list({
      data: { take: 20, search },
      token: requestContext.token,
      config: {
        headers: {
          Origin: requestContext.origin,
        },
      },
    });

    return {
      users: users.filter(user => user.id !== userId),
      connections: connections.map(connection => {
        if (connection.type === ConnectionType.OneToOne) {
          return prepareConnectionToSend(userId, connection);
        }

        return connection;
      }),
    };
  },
);
