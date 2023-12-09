import schema from '@lunaticenslaved/schema';

import { createOperation } from '#/server/context';
import { DialogFullWithPartner } from '#/server/models';

interface GetDialogRequest {
  dialogId: string;
}

interface GetDialogResponse {
  dialog: DialogFullWithPartner;
}

export const get = createOperation<GetDialogResponse, GetDialogRequest>(async (req, _, context) => {
  const { dialogId } = req.body;
  const dialog = await context.service.dialog.get({ dialogId });
  const { user } = await schema.actions.users.get({ data: { userId: dialog.userId } });

  return {
    dialog: {
      ...dialog,
      user,
    },
  };
});
