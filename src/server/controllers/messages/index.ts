import { MessageClientEvent } from '#/api/message';
import { utils } from '#/server/shared';

import { create } from './create';
import { list } from './list';

export const addMessagesEvents = utils.app.createSocketEvents(socket => {
  socket.on(MessageClientEvent.Send, create(socket, MessageClientEvent.Send));
});

export const addMessagesRoutes = utils.app.createRoutes(app => {
  app.post('/api/messages/list', list);
});
