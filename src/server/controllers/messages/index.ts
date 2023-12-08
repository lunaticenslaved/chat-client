import { MessageEvent } from '@api/messages';
import { Socket } from 'socket.io';

import { context } from '@/context';

import { create } from './create';

export function addMessagesEvents(socket: Socket) {
  socket.on(MessageEvent.send, arg => create(arg, socket, context));
}
