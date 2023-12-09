import { SocketEventsEmitter } from '../socket-emitter';

import { MessageClientEvent, SendMessageRequest } from './types';

export class MessageEventsEmitter extends SocketEventsEmitter {
  sendMessage(value: SendMessageRequest) {
    console.log('SEND MESSAGE');
    this.socket.emit(MessageClientEvent.Send, value);
  }
}
