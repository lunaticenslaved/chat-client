import { SendMessageRequest } from '#/api/message';
import { createSocketOperation, prisma } from '#/server/context';
import { connectionsService } from '#/server/service/connections';
import { messagesService } from '#/server/service/messages';
import { logger } from '#/server/shared';
import { connectionsEventsEmitter } from '#/server/socket-emitters/connection';
import { messagesEventsEmitter } from '#/server/socket-emitters/message';

export const create = createSocketOperation<SendMessageRequest>(async (data, eventContext) => {
  logger.info(`[SOCKET][MESSAGE] Create message:\n ${JSON.stringify(data)}`);

  const authorId = eventContext.getUserIdStrict();
  let connectionId: string | undefined;

  if ('userId' in data) {
    const success = await prisma.$transaction(async trx => {
      if (
        !(await messagesService.canSendMessageToUser({ fromUser: authorId, toUser: data.userId }))
      ) {
        return false;
      }

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

      return true;
    });

    if (!success) return;
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
