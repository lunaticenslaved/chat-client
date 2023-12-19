import { GetConnectionRequest, GetConnectionResponse } from '#/api/connection';
import { createOperation } from '#/server/context';
import { prepareConnectionToSend } from '#/server/models/connection';

export const get = createOperation<GetConnectionResponse, GetConnectionRequest>(
  async (request, requestContext, appContext) => {
    const userId = requestContext.userId;

    if (!userId) {
      throw new Error('Unknown user');
    }

    const connection = await appContext.metaService.connection.get(requestContext, {
      connectionId: request.body.connectionId,
    });

    const preparedConnection = prepareConnectionToSend(userId, connection);

    return preparedConnection;
  },
);
