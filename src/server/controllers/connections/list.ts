import { ListConnectionsRequest, ListConnectionsResponse } from '#/api/connection';
import { ConnectionType, OneToOneConnection } from '#/domain/connection';
import { createOperation } from '#/server/context';
import { connectionsService } from '#/server/service/connections';

export const list = createOperation<ListConnectionsResponse, ListConnectionsRequest>(
  async (_, requestContext) => {
    const userId = requestContext.userId;

    if (!userId) {
      throw new Error('User id not found');
    }

    const connections = await connectionsService.list(requestContext, {
      userId,
    });

    return {
      connections: connections.map(connection => {
        if (connection.type === ConnectionType.OneToOne) {
          const { users, ...data } = connection;

          const partner = users.find(user => user.id !== userId);

          if (!partner) {
            throw new Error('Partner not found');
          }

          const response: OneToOneConnection = {
            ...data,
            oneToOneDialog: {
              ...data.oneToOneDialog,
              partner,
            },
          };

          return response;
        }

        return connection;
      }),
    };
  },
);
