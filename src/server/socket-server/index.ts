import { Server } from 'socket.io';

import { connectionsService } from '#/server/service/connections';
import { socketsService } from '#/server/service/sockets';

type AddUserToConnectionRequest = {
  userId: string;
  connectionId: string;
};

export class SocketServer {
  static server: Server;

  static async addUserToConnection(data: AddUserToConnectionRequest): Promise<void> {
    const { connectionId, userId } = data;

    const sockets = await socketsService.getSocketsForUser(userId);

    for (const { id: socketId } of sockets) {
      const namespace = SocketServer.server.of('/');
      const socket = namespace.sockets.get(socketId);

      if (!socket) return;

      socket.join(connectionId);
    }
  }

  static async emitToConnection<T>(connectionId: string, event: string, data: T) {
    SocketServer.server.to(connectionId).emit(event, data);
  }

  static async emitToAllUsersForUser<T>(userId: string, event: string, data: T) {
    const connections = await connectionsService.list({ userId });

    for (const connection of connections) {
      if (connection.oneToOneDialog) {
        SocketServer.emitToConnection(connection.id, event, data);
      }
    }
  }
}
