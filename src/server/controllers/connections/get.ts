import { GetConnectionRequest, GetConnectionResponse } from '#/api/connection';
import { createOperation } from '#/server/context';
import { prepareConnectionToSend } from '#/server/models/connection';
import { connectionsService } from '#/server/service/connections';

export const get = createOperation<GetConnectionResponse, GetConnectionRequest>(
  async (request, requestContext) => {
    const userId = requestContext.userId;

    if (!userId) {
      throw new Error('Unknown user');
    }

    const connection = await connectionsService.get(requestContext, {
      connectionId: request.body.connectionId,
    });

    const preparedConnection = prepareConnectionToSend(userId, connection);

    return preparedConnection;
  },
);
