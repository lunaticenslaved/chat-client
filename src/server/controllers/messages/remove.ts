import { DeleteMessageRequest } from '#/api/message';
import { createSocketOperation } from '#/server/context';
import { messagesService } from '#/server/service/messages';
import { logger } from '#/server/shared';

export const remove = createSocketOperation<DeleteMessageRequest>(async (data, eventContext) => {
  logger.info(`[SOCKET][MESSAGE] Delete message:\n ${JSON.stringify(data)}`);

  await messagesService.delete(eventContext, data);
});
