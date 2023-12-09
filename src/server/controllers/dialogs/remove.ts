import schema, { Errors } from '@lunaticenslaved/schema';

import { createOperation } from '#/server/context';
import { utils } from '#/server/shared';

interface RemoveDialogRequest {
  dialogId: string;
}

export const remove = createOperation<null, RemoveDialogRequest>(async (req, _, context) => {
  const { dialogId } = req.body;
  const token = utils.request.getToken(req, 'strict');
  const { user } = await schema.actions.viewer.get({ token, data: undefined });

  const dialog = await context.service.dialog.get({ dialogId });

  if (!dialog) return null;

  if (dialog.ownerId !== user.id && dialog.userId !== user.id) {
    throw new Errors.ValidationError({ messages: "One cannot remove not one's dialog" });
  }

  return null;
});
