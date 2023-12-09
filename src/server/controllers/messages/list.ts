import { ListMessagesRequest, ListMessagesResponse } from '#/api/message';
import { createOperation } from '#/server/context';
import { getToken } from '#/server/shared/request';

export const list = createOperation<ListMessagesResponse, ListMessagesRequest>(
  async (req, _, context) => {
    const messages = await context.metaService.message.listWithAuthor({
      ...req.body,
      token: getToken(req, 'strict'),
      origin: req.headers.origin || '',
    });

    return { messages };
  },
);
