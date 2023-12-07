import { User } from '@common/models';

import schema from '@lunaticenslaved/schema';

import { createOperation } from '@/context';
import { DialogFullWithPartner } from '@/models';
import { getToken } from '@/shared/request';

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

    // TODO: rewrite schema to not add headers every time
    const { user } = await schema.actions.viewer.get({
      data: undefined,
      token: getToken(req),
      config: {
        headers: {
          Origin: req.headers.origin,
        },
      },
    });

    const dialogs = await context.metaService.dialog.listWithPartners(req, {
      ownerId: user.id,
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
