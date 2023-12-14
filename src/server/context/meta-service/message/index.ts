import schema from '@lunaticenslaved/schema';

import { Message } from '#/domain/message';
import { IRequestContext } from '#/server/shared/operation';
import { Transaction } from '#/server/shared/prisma';

import { BaseMetaService } from '../base-metaservice';

import {
  CreateMessageRequest,
  CreateMessageResponse,
  ListMessagesRequest,
  ListMessagesResponse,
} from './types';
import { select } from './utils';

export class MessagesMetaService extends BaseMetaService {
  async create(
    requestContext: IRequestContext,
    data: CreateMessageRequest,
    trx?: Transaction,
  ): Promise<CreateMessageResponse> {
    const prisma = trx || this.prisma;

    const rawMessage = await prisma.message.create({ select, data });

    const { user: author } = await schema.actions.users.get({
      token: requestContext.token,
      data: { userId: data.authorId },
      config: { headers: { Origin: requestContext.origin } },
    });

    if (!author) {
      throw new Error('Author not found');
    }

    const message: Message = {
      author,
      connectionId: data.connectionId,
      id: rawMessage.id,
      text: rawMessage.text,
      authorId: rawMessage.authorId,
      createdAt: rawMessage.createdAt.toISOString(),
      isRead: false,
      attachments: [],
    };

    this.eventBus.emit('message-created', message);

    return message;
  }

  async list(
    requestContext: IRequestContext,
    data: ListMessagesRequest,
    trx?: Transaction,
  ): Promise<ListMessagesResponse> {
    const prisma = trx || this.prisma;

    const messages = await prisma.message.findMany({
      select,
      take: data.take,
      where: { connectionId: data.connectionId },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const { users } = await schema.actions.users.list({
      data: { userIds: messages.map(d => d.authorId) },
      token: requestContext.token,
      config: {
        headers: {
          Origin: requestContext.origin,
        },
      },
    });

    return messages.reduce<Message[]>((acc, message) => {
      const author = users.find(p => p.id === message.authorId);

      if (author) {
        acc.push({
          ...message,
          createdAt: message.createdAt.toISOString(),
          author,
          isRead: false,
          attachments: [],
        });
      }

      return acc;
    }, []);
  }
}
