import { Message } from '#/domain/message';

import { SocketEventListener } from '../socket-listener';

import { MessageServerEvent } from './types';

export class MessageEventsListener extends SocketEventListener {
  messageCreated(fn: (data: Message) => void) {
    this.addListener(MessageServerEvent.Created, fn);
  }
}
