import schema from '@lunaticenslaved/schema';

import { SearchInChannelsRequest, SearchInChannelsResponse } from '#/api/search';
import { ConnectionType } from '#/domain/connection';
import { createOperation } from '#/server/context';
import { prepareOneToOneConnectionToSend } from '#/server/models/connection';

export const searchInChannels = createOperation<SearchInChannelsResponse, SearchInChannelsRequest>(
  async (req, requestContext, context) => {
    const { search } = req.body;
    const userId = requestContext.userId;

    if (!userId) {
      // FIXME add function to request context to get user id strict
      throw new Error('User id not found');
    }

    const connections = await context.metaService.connection.list(requestContext, {
      userId,
      search,
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
      users,
      connections: connections.map(connection => {
        if (connection.type === ConnectionType.OneToOne) {
          return prepareOneToOneConnectionToSend(userId, connection);
        }

        return connection;
      }),
    };
  },
);
