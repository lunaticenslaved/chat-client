import { Errors } from '@lunaticenslaved/schema';

import { SendMessageRequest } from '#/api/message';
import { createSocketOperation, prisma } from '#/server/context';
import { connectionsService } from '#/server/service/connections';
import { messagesService } from '#/server/service/messages';
import { logger } from '#/server/shared';
import { connectionsEventsEmitter } from '#/server/socket-emitters/connection';
import { messagesEventsEmitter } from '#/server/socket-emitters/message';

export const create = createSocketOperation<SendMessageRequest>(async (data, eventContext) => {
  logger.info(`[SOCKET][MESSAGE] Create message:\n ${JSON.stringify(data)}`);

  const authorId = eventContext.userId;

  if (!authorId) {
    logger.error(`[SOCKET][MESSAGE] Not authorized`);

    throw new Errors.UnauthorizedError({ messages: 'Not authorized' });
  }

  let connectionId: string | undefined;

  if ('userId' in data) {
    await prisma.$transaction(async trx => {
      let connection = await connectionsService.findOneToOne(
        {
          userId1: authorId,
          userId2: data.userId,
        },
        trx,
      );

      if (!connection) {
        connection = await connectionsService.createOneToOne({
          authorId: authorId,
          partnerId: data.userId,
        });
      }

      if (!connection) {
        throw new Error('No connection');
      }

      connectionId = connection.id;

      connectionsEventsEmitter.onConnectionCreated(eventContext, connection);
    });
  } else {
    connectionId = data.connectionId;
  }

  if (!connectionId) {
    throw new Error('No connection id');
  }

  const message = await messagesService.create({
    authorId,
    connectionId,
    text: data.text,
  });

  messagesEventsEmitter.onMessageCreated(eventContext, message);
});
