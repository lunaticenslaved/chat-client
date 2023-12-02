import { utils } from '@/shared';

import { create } from './create';
import { get } from './get';
import { list } from './list';
import { remove } from './remove';

export const addDialogsRoutes = utils.app.createRoutes(app => {
  app.post('/api/dialogs', create);
  app.get('/api/dialogs/:dialogId', get);
  app.get('/api/dialogs', list);
  app.delete('/api/dialogs/:dialogId', remove);
});
