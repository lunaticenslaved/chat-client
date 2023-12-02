import schema, { ResponseUtils } from '@lunaticenslaved/schema';
// FIXME fix import path
import { User } from '@lunaticenslaved/schema/dist/types/models';

import { createOperation } from '@/context';
import { DialogFullWithPartner } from '@/models';
import { utils } from '@/shared';

interface ListDialogRequestQuery {
  search?: string;
}
interface ListDialogResponse {
  dialogs: DialogFullWithPartner[];
  users?: User[];
}

export const list = createOperation<ListDialogResponse>(async (req, _, context) => {
  const { search } = req.query as ListDialogRequestQuery;
  const token = utils.request.getToken(req, 'strict');
  const { user } = await schema.actions.viewer
    .get({ token, config: { headers: req.headers } })
    .then(ResponseUtils.unwrapResponse);
  const dialogs = await context.service.dialog.list({ ownerId: user.id });

  if (!search && !dialogs.length) {
    return { dialogs: [] };
  }

  const { users: partners } = await schema.actions.users
    .list({
      data: { userIds: dialogs.map(d => d.partnerId), search },
      config: { headers: req.headers },
    })
    .then(ResponseUtils.unwrapResponse);

  const dialogsWithPartners = dialogs.reduce<DialogFullWithPartner[]>((acc, dialog) => {
    const partner = partners.find(p => p.id === dialog.partnerId);

    if (partner) {
      acc.push({ ...dialog, partner });
    }

    return acc;
  }, []);

  let users: User[] = [];

  if (search) {
    const data = await schema.actions.users
      .list({
        data: { take: 20, search },
        config: { headers: req.headers },
      })
      .then(ResponseUtils.unwrapResponse);

    users = data.users;
  }

  return {
    dialogs: dialogsWithPartners,
    users,
  };
});
