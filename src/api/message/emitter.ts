import { SocketEventsEmitter } from '../socket-emitter';

import {
  DeleteMessageRequest,
  MessageClientEvent,
  ReadMessageRequest,
  SendMessageRequest,
} from './types';

export class MessageEventsEmitter extends SocketEventsEmitter {
  sendMessage(value: SendMessageRequest) {
    this.socket.emit(MessageClientEvent.Send, value);
  }

  deleteMessage(value: DeleteMessageRequest) {
    this.socket.emit(MessageClientEvent.Delete, value);
  }

  readMessage(value: ReadMessageRequest) {
    this.socket.emit(MessageClientEvent.Read, value);
  }
}
