import { utils } from '#/server/shared';

import { searchInChannels } from './in-channels';

export const addSearchRoutes = utils.app.createRoutes(app => {
  app.post('/api/search/in-channels', searchInChannels);
});
