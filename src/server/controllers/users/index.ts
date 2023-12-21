import { utils } from '#/server/shared';

import { block } from './block';
import { listBlocked } from './list-blocked';
import { listUsersStatuses } from './list-users-statuses';
import { unblock } from './unblock';

export const addUsersRoutes = utils.app.createRoutes(app => {
  app.post('/api/users/block', block);
  app.post('/api/users/unblock', unblock);
  app.post('/api/users/list-statuses', listUsersStatuses);
  app.post('/api/users/list-blocked', listBlocked);
});
