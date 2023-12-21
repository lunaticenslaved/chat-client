import { DeleteMessageRequest } from '#/api/message';
import { canDeleteMessage } from '#/domain/message';
import { createSocketOperation, prisma } from '#/server/context';
import { messagesService } from '#/server/service/messages';
import { logger } from '#/server/shared';
import { messagesEventsEmitter } from '#/server/socket-emitters/message';

export const remove = createSocketOperation<DeleteMessageRequest>(async (data, request) => {
  logger.info(`[SOCKET][MESSAGE] Delete message:\n ${JSON.stringify(data)}`);
  const viewerId = request.getUserIdStrict();

  await prisma.$transaction(async trx => {
    const message = await messagesService.get(data.messageId, trx);

    if (message && canDeleteMessage({ authorId: message.authorId, viewerId })) {
      await messagesService.delete(data);

      messagesEventsEmitter.onMessageDeleted({
        connectionId: message.connectionId,
        messageId: message.id,
      });
    }
  });
});
