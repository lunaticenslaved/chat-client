import { SocketEventsEmitter } from '../socket-emitter';

import { ListMessagesRequest, MessageClientEvent, SendMessageRequest } from './types';

export class MessageEventsEmitter extends SocketEventsEmitter {
  sendMessage(value: SendMessageRequest) {
    console.log('SEND MESSAGE');
    this.socket.emit(MessageClientEvent.Send, value);
  }

  listMessages(value: ListMessagesRequest) {
    console.log('LIST MESSAGES');
    this.socket.emit(MessageClientEvent.Send, value);
  }
}
