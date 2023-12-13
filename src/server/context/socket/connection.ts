import { Errors } from '@lunaticenslaved/schema';
import { OperationResponse } from '@lunaticenslaved/schema/dist/types/models';

import { ConnectionServerEvent, CreateConnectionResponse } from '#/api/connection';
import {
  OneToOneConnection as OneToOneConnectionServer,
  prepareOneToOneConnectionToSend,
} from '#/server/models/connection';
import { IRequestContext } from '#/server/shared/operation';

import { SocketEventEmitter } from './_base';

// TODO: make function in schema to create operation response

export class ConnectionSocketEvents extends SocketEventEmitter {
  async onOneToOneCreated(
    requestContext: IRequestContext,
    connectionBase: OneToOneConnectionServer,
    error: Errors.ApiError | null = null,
  ) {
    const { users } = connectionBase;
    const { userId } = requestContext;

    if (!userId) {
      throw new Error('User id not found');
    }

    for (const user of users) {
      const socketId = this.context.socketMap.getSocketId(user.id);

      if (!socketId) continue;

      const preparedConnection = prepareOneToOneConnectionToSend(user.id, connectionBase);

      const namespace = this.context.socketServer.of('/');
      const socket = namespace.sockets.get(socketId);

      const response: OperationResponse<CreateConnectionResponse> = error
        ? { data: null, error }
        : {
            error: null,
            data: preparedConnection,
          };

      socket?.emit(ConnectionServerEvent.Created, response);
    }
  }

  onOneToOneUpdated(
    requestContext: IRequestContext,
    connectionBase: OneToOneConnectionServer,
    error: Errors.ApiError | null = null,
  ) {
    const { users } = connectionBase;
    const { userId } = requestContext;

    if (!userId) {
      throw new Error('User id not found');
    }

    for (const user of users) {
      const socketId = this.context.socketMap.getSocketId(user.id);

      if (!socketId) continue;

      const preparedConnection = prepareOneToOneConnectionToSend(user.id, connectionBase);

      const namespace = this.context.socketServer.of('/');
      const socket = namespace.sockets.get(socketId);

      const response: OperationResponse<CreateConnectionResponse> = error
        ? { data: null, error }
        : {
            error: null,
            data: preparedConnection,
          };

      socket?.emit(ConnectionServerEvent.Updated, response);
    }
  }
}
