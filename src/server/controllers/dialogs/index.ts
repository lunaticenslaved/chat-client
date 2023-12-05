import { utils } from '@/shared';

import { create } from './create';
import { get } from './get';
import { list } from './list';
import { remove } from './remove';

export const addDialogsRoutes = utils.app.createRoutes(app => {
  app.post('/api/dialogs/create', create);
  app.post('/api/dialogs/list', list);
  app.post('/api/dialogs/get', get);
  app.post('/api/dialogs/remove', remove);
});
