import schema from '@lunaticenslaved/schema';

import { Message } from '#/domain/message';

import { BaseMetaService } from '../base-metaservice';

import { ListMessagesRequest, ListMessagesResponse } from './types';

export class MessagesMetaService extends BaseMetaService {
  async listWithAuthor(data: ListMessagesRequest): Promise<ListMessagesResponse> {
    const messages = await this.service.message.list(data);
    const { users } = await schema.actions.users.list({
      data: { userIds: messages.map(d => d.authorId) },
      config: {
        headers: {
          Origin: data.origin,
        },
      },
    });

    return messages.reduce<Message[]>((acc, message) => {
      const author = users.find(p => p.id === message.authorId);

      if (author) {
        acc.push({ ...message, author });
      }

      return acc;
    }, []);
  }
}
