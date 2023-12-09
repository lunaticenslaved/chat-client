import schema from '@lunaticenslaved/schema';

import { User } from '#/domain/user';
import { createOperation } from '#/server/context';
import { DialogFullWithPartner } from '#/server/models';
import { getToken } from '#/server/shared/request';

interface SearchInChannelsRequest {
  search: string;
}

interface SearchInChannelsResponse {
  dialogs: DialogFullWithPartner[];
  users: User[];
}

export const searchInChannels = createOperation<SearchInChannelsResponse, SearchInChannelsRequest>(
  async (req, _, context) => {
    const { search } = req.body;
    const token = getToken(req, 'strict');
    const origin = req.headers.origin || '';

    // TODO: rewrite schema to not add headers every time
    const { user } = await schema.actions.viewer.get({
      token,
      data: undefined,
      config: {
        headers: {
          Origin: origin,
        },
      },
    });

    const dialogs = await context.metaService.dialog.listWithPartners({
      ownerId: user.id,
      origin,
      search,
    });

    const { users } = await schema.actions.users.list({
      data: { take: 20, search },
      token: getToken(req),
      config: {
        headers: {
          Origin: req.headers.origin,
        },
      },
    });

    return {
      dialogs,
      users,
    };
  },
);
