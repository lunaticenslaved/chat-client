import { Server, Socket } from 'socket.io';

import { prisma } from '#/server/context';
import {
  connectionsService,
  isGroupConnection,
  isOneToOneConnection,
} from '#/server/service/connections';
import { socketsService } from '#/server/service/sockets';
import { usersService } from '#/server/service/users';
import { userEventsEmitter } from '#/server/socket-emitters/user';
import { notReachable } from '#/shared/utils';

type AddUserToConnectionRequest = {
  userId: string;
  connectionId: string;
};

export class SocketServer {
  static server: Server;

  static async onUserConnected(socket: Socket, userId: string) {
    const existingConnections = await prisma.connection.findMany({
      select: { id: true },
      where: { users: { some: { id: userId } } },
    });

    for (const existingConnection of existingConnections) {
      socket.join(existingConnection.id);
    }

    socket.join(userId);
  }

  static async onUserDisconnected(socket: Socket, userId: string) {
    if (userId) {
      await usersService.updateUser({ id: userId, isOnline: false });
      await usersService.removeSocket({ socketId: socket.id });
      socket.leave(userId);
      userEventsEmitter.onUserIsOffline(userId);
    }
  }

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

  static async emitToUser<T>(userId: string, event: string, data: T) {
    SocketServer.server.to(userId).emit(event, data);
  }

  static async emitToAllUsersForUser<T>(userId: string, event: string, data: T) {
    const connections = await connectionsService.list({ userId });

    for (const connection of connections) {
      if (isOneToOneConnection(connection)) {
        SocketServer.emitToConnection(connection.id, event, data);
      } else if (isGroupConnection(connection)) {
        throw new Error('Not implemented');
      } else {
        notReachable(connection);
      }
    }
  }
}
