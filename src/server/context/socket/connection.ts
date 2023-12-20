import { OperationResponse } from '@lunaticenslaved/schema/dist/types/models';

import { ConnectionServerEvent, CreateConnectionResponse } from '#/api/connection';
import { connectionsPipe } from '#/server/pipes/connection';
import { Connection } from '#/server/service/connections';
import { socketsService } from '#/server/service/sockets';
import { logger } from '#/server/shared';
import { IRequestContext } from '#/server/shared/operation';

import { SocketEventEmitter } from './_base';

// TODO: make function in schema to create operation response

export class ConnectionSocketEvents extends SocketEventEmitter {
  async onConnectionCreated(request: IRequestContext, connectionBase: Connection) {
    const { users } = connectionBase;

    logger.info(`Emit connection created for users: ${users.length}`);

    for (const user of users) {
      this.context.addUserToConnection({ userId: user.id, connectionId: connectionBase.id });

      const sockets = await socketsService.getSocketsForUser(user.id);
      const preparedConnection = await connectionsPipe.fromServiceToDomain(request, connectionBase);
      const namespace = this.context.socketServer.of('/');

      const response: OperationResponse<CreateConnectionResponse> = {
        error: null,
        data: preparedConnection,
      };

      for (const { id: socketId } of sockets) {
        const socket = namespace.sockets.get(socketId);
        socket?.emit(ConnectionServerEvent.Created, response);
      }
    }
  }
}
