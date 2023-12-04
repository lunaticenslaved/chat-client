import schema from '@lunaticenslaved/schema';

import { createOperation } from '@/context';
import { Message } from '@/models';
import { utils } from '@/shared';

interface CreateMessageRequestBody {
  dialogId: string;
  text: string;
}

interface CreateMessageResponse {
  message: Message;
}

export const create = createOperation<CreateMessageResponse>(async (req, _, context) => {
  const { dialogId, text } = req.body as CreateMessageRequestBody;
  const token = utils.request.getToken(req, 'strict');
  // TODO can I get userId from token?
  const { user } = await schema.actions.viewer.get({
    token,
    config: { headers: req.headers },
    data: undefined,
  });

  const message = await context.service.message.create({
    dialogId,
    text,
    authorId: user.id,
  });

  return { message };
});
