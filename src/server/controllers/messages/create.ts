import { Errors } from '@lunaticenslaved/schema';

import { SendMessageRequest } from '#/api/message';
import { createSocketOperation } from '#/server/context';
import { logger } from '#/server/shared';

export const create = createSocketOperation<SendMessageRequest>(
  async (data, eventContext, appContext) => {
    logger.info(`[SOCKET][MESSAGE] Create message:\n ${JSON.stringify(data)}`);

    const authorId = eventContext.userId;

    if (!authorId) {
      logger.error(`[SOCKET][MESSAGE] Not authorized`);

      throw new Errors.UnauthorizedError({ messages: 'Not authorized' });
    }

    if ('userId' in data) {
      await appContext.metaService.connection.createOneToOne(eventContext, {
        partnerId: data.userId,
        message: {
          text: data.text,
        },
      });
    } else {
      await appContext.metaService.message.create(eventContext, {
        authorId,
        connectionId: data.connectionId,
        text: data.text,
      });
    }
  },
);
