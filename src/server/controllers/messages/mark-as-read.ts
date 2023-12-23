import { ReadMessageRequest } from '#/api/message';
import { createSocketOperation } from '#/server/context';
import { messagesService } from '#/server/service/messages';
import { logger } from '#/server/shared';
import { messagesEventsEmitter } from '#/server/socket-emitters/message';

export const markAsRead = createSocketOperation<ReadMessageRequest>(
  async ({ messageId }, request) => {
    logger.info(`[SOCKET][MESSAGE] Mark message as read: ${messageId}`);
    const userId = request.getUserIdStrict();

    const message = await messagesService.markAsRead({ messageId, userId });
    messagesEventsEmitter.onMessageUpdated(request, message);
  },
);
