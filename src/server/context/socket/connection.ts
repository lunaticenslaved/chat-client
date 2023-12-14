import { Errors } from '@lunaticenslaved/schema';
import { OperationResponse } from '@lunaticenslaved/schema/dist/types/models';

import { ConnectionServerEvent, CreateConnectionResponse } from '#/api/connection';
import { ConnectionType } from '#/domain/connection';
import { Connection, prepareConnectionToSend } from '#/server/models/connection';

import { SocketEventEmitter } from './_base';

// TODO: make function in schema to create operation response

export class ConnectionSocketEvents extends SocketEventEmitter {
  async onConnectionCreated(connectionBase: Connection, error: Errors.ApiError | null = null) {
    if (connectionBase.type !== ConnectionType.OneToOne) {
      throw new Error('Unknown connection type');
    }

    const { users } = connectionBase;

    for (const user of users) {
      this.context.addUserToConnection({ userId: user.id, connectionId: connectionBase.id });

      const socketId = this.context.socketMap.getSocketId(user.id);

      if (!socketId) continue;

      const preparedConnection = prepareConnectionToSend(user.id, connectionBase);

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
}
