import schema from '@lunaticenslaved/schema';

import { createOperation } from '#/server/context';
import { DialogFullWithPartner } from '#/server/models';
import { getToken } from '#/server/shared/request';

interface ListDialogResponse {
  dialogs: DialogFullWithPartner[];
}

export const list = createOperation<ListDialogResponse, void>(async (req, _, context) => {
  const origin = req.headers.origin || '';
  const { user } = await schema.actions.viewer.get({
    token: getToken(req),
    data: undefined,
    config: {
      headers: { Origin: origin },
    },
  });

  const dialogs = await context.metaService.dialog.listWithPartners({
    userId: user.id,
    origin,
  });

  return { dialogs };
});
