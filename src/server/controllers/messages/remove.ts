import { DeleteMessageRequest } from '#/api/message';
import { canDeleteMessage } from '#/domain/message';
import { createSocketOperation, prisma } from '#/server/context';
import { messagesService } from '#/server/service/messages';
import { logger } from '#/server/shared';

export const remove = createSocketOperation<DeleteMessageRequest>(
  async (data, request, appContext) => {
    logger.info(`[SOCKET][MESSAGE] Delete message:\n ${JSON.stringify(data)}`);
    const { userId: viewerId } = request;

    if (!viewerId) {
      throw new Error('Unknown user');
    }

    await prisma.$transaction(async trx => {
      const message = await messagesService.get(data.messageId, trx);

      if (message && canDeleteMessage({ authorId: message.authorId, viewerId })) {
        await messagesService.delete(data);

        appContext.socketEvent.message.onMessageDeleted({
          connectionId: message.connectionId,
          messageId: message.id,
        });
      }
    });
  },
);
