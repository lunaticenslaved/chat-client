import { ListMessagesRequest, ListMessagesResponse } from '#/api/message';
import { createOperation } from '#/server/context';

export const list = createOperation<ListMessagesResponse, ListMessagesRequest>(
  async (req, requestContext, context) => {
    const messages = await context.metaService.message.list(requestContext, req.body);

    return { messages };
  },
);
