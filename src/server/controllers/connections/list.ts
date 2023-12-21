import { ListConnectionsRequest, ListConnectionsResponse } from '#/api/connection';
import { createOperation } from '#/server/context';
import { connectionsPipe } from '#/server/pipes/connection';
import { connectionsService } from '#/server/service/connections';

export const list = createOperation<ListConnectionsResponse, ListConnectionsRequest>(
  async (_, requestContext) => {
    const userId = requestContext.getUserIdStrict();

    const connections = await connectionsService.list({ userId });

    return {
      connections: await Promise.all(
        connections.map(connection =>
          connectionsPipe.fromServiceToDomain(requestContext, connection),
        ),
      ),
    };
  },
);
