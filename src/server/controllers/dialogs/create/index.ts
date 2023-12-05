import schema from '@lunaticenslaved/schema';

import { createOperation } from '@/context';
import { DialogFullWithPartner } from '@/models';
import { utils } from '@/shared';

interface CreateDialogRequest {
  partnerId: string;
}

interface CreateDialogResponse {
  dialog: DialogFullWithPartner;
}

export const create = createOperation<CreateDialogResponse, CreateDialogRequest>(
  async (req, _, context) => {
    const { partnerId } = req.body;
    const token = utils.request.getToken(req, 'strict');
    const [{ user: author }, { user: partner }] = await Promise.all([
      schema.actions.viewer.get({ token, data: undefined }),
      schema.actions.users.get({ data: { userId: partnerId } }),
    ]);

    const newDialog = await context.service.dialog.create({
      partnerId,
      ownerId: author.id,
    });

    return { dialog: { ...newDialog, partner } };
  },
);
