import { utils } from '#/server/shared';

import { get } from './get';
import { list } from './list';

export const addConnectionsRoutes = utils.app.createRoutes(app => {
  app.post('/api/connections/list', list);
  app.post('/api/connections/get', get);
});
