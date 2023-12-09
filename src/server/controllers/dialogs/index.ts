import { Socket } from 'socket.io';

import { DialogClientEvent } from '#/api/dialog';
import { context } from '#/server/context';
import { utils } from '#/server/shared';

import { create } from './create';
import { get } from './get';
import { list } from './list';
import { list as onListEvent } from './list-event';
import { remove } from './remove';

export const addDialogsRoutes = utils.app.createRoutes(app => {
  app.post('/api/dialogs/create', create);
  app.post('/api/dialogs/list', list);
  app.post('/api/dialogs/get', get);
  app.post('/api/dialogs/remove', remove);
});

export function addDialogsEvents(socket: Socket) {
  socket.on(DialogClientEvent.List, arg => onListEvent(arg, socket, context));
}
