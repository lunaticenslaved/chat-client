import { Socket } from 'socket.io';

import { MessageClientEvent } from '#/api/message';
import { context } from '#/server/context';
import { utils } from '#/server/shared';

import { create } from './create';
import { list } from './list';

export function addMessagesEvents(socket: Socket) {
  socket.on(MessageClientEvent.Send, arg => create(arg, socket, context));
}

export const addMessagesRoutes = utils.app.createRoutes(app => {
  app.post('/api/messages/list', list);
});
