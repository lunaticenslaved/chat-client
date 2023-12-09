import { Socket } from 'socket.io-client';

export class SocketEventsEmitter {
  protected socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }
}
