import { Server } from 'socket.io';

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
}
