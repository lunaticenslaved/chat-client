import { GetConnectionRequest, GetConnectionResponse } from '#/api/connection';
import { createOperation } from '#/server/context';
import { connectionsPipe } from '#/server/pipes/connection';
import { connectionsService } from '#/server/service/connections';

export const get = createOperation<GetConnectionResponse, GetConnectionRequest>(
  async ({ connectionId }, requestContext) => {
    const userId = requestContext.userId;

    if (!userId) {
      throw new Error('Unknown user');
    }

    const connection = await connectionsService.get({ connectionId });

    return connectionsPipe.fromServiceToDomain(requestContext, connection);
  },
);
