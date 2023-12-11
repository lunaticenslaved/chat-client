export type AddUserToSocket = {
  userId: string;
  socketId: string;
};

export class SocketByUser {
  private userSocket: Record<string, string> = {};
  private socketUser: Record<string, string> = {};

  addUser({ userId, socketId }: AddUserToSocket) {
    this.socketUser[socketId] = userId;
    this.userSocket[userId] = socketId;
  }

  removeUser(userId: string) {
    const socketId = this.userSocket[userId];

    if (socketId in this.socketUser) {
      delete this.socketUser[socketId];
    }

    if (userId in this.userSocket) {
      delete this.userSocket[userId];
    }
  }

  removeSocket(socketId: string) {
    const userId = this.socketUser[socketId];

    if (socketId in this.socketUser) {
      delete this.socketUser[socketId];
    }

    if (userId in this.userSocket) {
      delete this.userSocket[userId];
    }
  }

  getSocketId(userId: string): string | undefined {
    return this.userSocket[userId];
  }

  getUserId(socketId: string): string | undefined {
    return this.socketUser[socketId];
  }
}
