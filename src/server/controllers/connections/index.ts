import { utils } from '#/server/shared';

import { list } from './list';

export const addConnectionsRoutes = utils.app.createRoutes(app => {
  app.post('/api/connections/list', list);
});
