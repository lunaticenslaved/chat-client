import schema from '@lunaticenslaved/schema';

import { createOperation } from '#/server/context';
import { DialogFullWithPartner } from '#/server/models';
import { getToken } from '#/server/shared/request';

interface ListDialogResponse {
  dialogs: DialogFullWithPartner[];
}

export const list = createOperation<ListDialogResponse, void>(async (req, _, context) => {
  const { host: _host, ...headers } = req.headers;
  const { user } = await schema.actions.viewer.get({
    data: undefined,
    token: getToken(req),
    config: {
      headers: {
        Origin: headers.origin,
      },
    },
  });

  const dialogs = await context.metaService.dialog.listWithPartners(req, {
    ownerId: user.id,
  });

  return { dialogs };
});
