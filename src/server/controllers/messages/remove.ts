import { DeleteMessageRequest } from '#/api/message';
import { createSocketOperation } from '#/server/context';
import { logger } from '#/server/shared';

export const remove = createSocketOperation<DeleteMessageRequest>(
  async (data, eventContext, appContext) => {
    logger.info(`[SOCKET][MESSAGE] Delete message:\n ${JSON.stringify(data)}`);

    await appContext.metaService.message.delete(eventContext, data);
  },
);
