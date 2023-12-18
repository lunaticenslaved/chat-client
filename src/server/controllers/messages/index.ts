import { MessageClientEvent } from '#/api/message';
import { utils } from '#/server/shared';

import { create } from './create';
import { list } from './list';
import { remove } from './remove';

export const addMessagesEvents = utils.app.createSocketEvents(eventContext => {
  eventContext.socket.on(MessageClientEvent.Send, create(eventContext, MessageClientEvent.Send));
  eventContext.socket.on(
    MessageClientEvent.Delete,
    remove(eventContext, MessageClientEvent.Delete),
  );
});

export const addMessagesRoutes = utils.app.createRoutes(app => {
  app.post('/api/messages/list', list);
});
