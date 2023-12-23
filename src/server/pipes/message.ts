import schema from '@lunaticenslaved/schema';

import { Message as DomainMessage } from '#/domain/message';
import { Message as ServiceMessage } from '#/server/service/messages';
import { IRequestContext } from '#/server/shared/operation';

class MessagesPipe {
  async fromServerToDomain(
    requestContext: IRequestContext,
    serviceMessage: ServiceMessage,
  ): Promise<DomainMessage> {
    const { user: author } = await schema.actions.users.get({
      data: { userId: serviceMessage.authorId },
      config: {
        headers: {
          Origin: requestContext.origin,
        },
      },
    });

    return {
      author,

      id: serviceMessage.id,
      text: serviceMessage.text,
      createdAt: serviceMessage.createdAt.toISOString(),
      authorId: serviceMessage.authorId,
      connectionId: serviceMessage.connectionId,
      attachments: [],
      isReadByUsers: serviceMessage.isReadByUsers,
    };
  }
}

export const messagesPipe = new MessagesPipe();
