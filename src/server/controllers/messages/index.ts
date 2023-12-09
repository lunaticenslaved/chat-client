import { Socket } from 'socket.io';

import { MessageClientEvent } from '#/api/message';
import { context } from '#/server/context';

import { create } from './create';

export function addMessagesEvents(socket: Socket) {
  socket.on(MessageClientEvent.Send, arg => create(arg, socket, context));
}
