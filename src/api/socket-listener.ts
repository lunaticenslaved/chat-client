import { Socket } from 'socket.io-client';

export class SocketEventListener {
  protected socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }
}
