import schema from '@lunaticenslaved/schema';

import { createOperation } from '@/context';
import { Message } from '@/models';
import { utils } from '@/shared';

interface CreateMessageRequest {
  dialogId: string;
  text: string;
}

interface CreateMessageResponse {
  message: Message;
}

export const create = createOperation<CreateMessageResponse, CreateMessageRequest>(
  async (req, _, context) => {
    const { dialogId, text } = req.body;
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
  },
);
