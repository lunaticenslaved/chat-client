import { ListMessagesRequest, ListMessagesResponse } from '#/api/message';
import { createOperation } from '#/server/context';
import { messagesPipe } from '#/server/pipes/message';
import { messagesService } from '#/server/service/messages';

export const list = createOperation<ListMessagesResponse, ListMessagesRequest>(
  async (req, requestContext) => {
    const messages = await messagesService.list(req.body);

    return {
      messages: await Promise.all(
        messages.map(message => messagesPipe.fromServerToDomain(requestContext, message)),
      ),
    };
  },
);
