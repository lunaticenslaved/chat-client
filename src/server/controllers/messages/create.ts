import { Errors } from '@lunaticenslaved/schema';

import { SendMessageRequest } from '#/api/message';
import { createSocketOperation } from '#/server/context';
import { connectionsService } from '#/server/service/connections';
import { messagesService } from '#/server/service/messages';
import { logger } from '#/server/shared';

export const create = createSocketOperation<SendMessageRequest>(async (data, eventContext) => {
  logger.info(`[SOCKET][MESSAGE] Create message:\n ${JSON.stringify(data)}`);

  const authorId = eventContext.userId;

  if (!authorId) {
    logger.error(`[SOCKET][MESSAGE] Not authorized`);

    throw new Errors.UnauthorizedError({ messages: 'Not authorized' });
  }

  if ('userId' in data) {
    await connectionsService.createOneToOne(eventContext, {
      partnerId: data.userId,
      message: {
        text: data.text,
      },
    });
  } else {
    await messagesService.create(eventContext, {
      authorId,
      connectionId: data.connectionId,
      text: data.text,
    });
  }
});
