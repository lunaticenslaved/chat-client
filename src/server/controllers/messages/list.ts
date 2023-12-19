import { ListMessagesRequest, ListMessagesResponse } from '#/api/message';
import { createOperation } from '#/server/context';
import { messagesService } from '#/server/service/messages';

export const list = createOperation<ListMessagesResponse, ListMessagesRequest>(
  async (req, requestContext) => {
    const messages = await messagesService.list(requestContext, req.body);

    return { messages };
  },
);
