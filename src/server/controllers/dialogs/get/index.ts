import schema from '@lunaticenslaved/schema';

import { createOperation } from '@/context';
import { DialogFullWithPartner } from '@/models';

interface GetDialogRequestParams {
  dialogId: string;
}

interface GetDialogResponse {
  dialog: DialogFullWithPartner;
}

export const get = createOperation<GetDialogResponse>(async (req, _, context) => {
  const { dialogId } = req.params as unknown as GetDialogRequestParams;

  const dialog = await context.service.dialog.get({ dialogId });
  const { user: partner } = await schema.actions.users.get({ data: { userId: dialog.partnerId } });

  return {
    dialog: {
      ...dialog,
      partner,
    },
  };
});
