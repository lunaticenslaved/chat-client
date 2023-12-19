import schema from '@lunaticenslaved/schema';

import { DeleteMessageRequest } from '#/api/message';
import { Message, canDeleteMessage } from '#/domain/message';
import { eventBus, prisma } from '#/server/context';
import { IRequestContext } from '#/server/shared/operation';
import { Transaction } from '#/server/shared/prisma';

import { BaseService } from '../base-service';

import {
  CreateMessageRequest,
  CreateMessageResponse,
  ListMessagesRequest,
  ListMessagesResponse,
} from './types';
import { select } from './utils';

export class MessagesService extends BaseService {
  async create(
    requestContext: IRequestContext,
    data: CreateMessageRequest,
    trx?: Transaction,
  ): Promise<CreateMessageResponse> {
    const rawMessage = await (trx || prisma).message.create({ select, data });

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

    eventBus.emit('message-created', message);

    return message;
  }

  async list(
    requestContext: IRequestContext,
    data: ListMessagesRequest,
    trx?: Transaction,
  ): Promise<ListMessagesResponse> {
    const { connectionId, take, prevLoadedMessageId } = data;

    const messages = await (trx || prisma).message.findMany({
      select,
      take,
      skip: prevLoadedMessageId ? take : undefined,
      cursor: prevLoadedMessageId ? { id: prevLoadedMessageId } : undefined,
      where: { connectionId },
      orderBy: {
        createdAt: 'desc',
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
        acc.unshift({
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

  async delete(requestContext: IRequestContext, data: DeleteMessageRequest) {
    const { messageId } = data;

    prisma.$transaction(async trx => {
      const { userId: viewerId } = requestContext;
      const message = await trx.message.findFirst({
        where: { id: messageId },
        select: { authorId: true, id: true, connectionId: true },
      });

      if (!viewerId) {
        throw new Error('User required');
      }

      if (!message) {
        eventBus.emit('message-deleted', data);
      } else if (canDeleteMessage({ viewerId, message })) {
        await trx.message.delete({ where: { id: message.id } });
        eventBus.emit('message-deleted', data);
      }
    });
  }
}
