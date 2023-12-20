import { DeleteMessageRequest } from '#/api/message';
import { prisma } from '#/server/context';
import { Transaction } from '#/server/shared/prisma';

import { BaseService } from '../base-service';

import { CreateMessageRequest, ListMessagesRequest } from './types';
import { Message, select } from './utils';

export class MessagesService extends BaseService {
  async create(data: CreateMessageRequest, trx?: Transaction): Promise<Message> {
    const rawMessage = await (trx || prisma).message.create({ select, data });

    const message: Message = {
      connectionId: data.connectionId,
      id: rawMessage.id,
      text: rawMessage.text,
      authorId: rawMessage.authorId,
      createdAt: rawMessage.createdAt,
    };

    return message;
  }

  async list(data: ListMessagesRequest, trx?: Transaction): Promise<Message[]> {
    const { connectionId, take, prevLoadedMessageId } = data;

    const messages = await (trx || prisma).message.findMany({
      select,
      take,
      skip: prevLoadedMessageId ? take : undefined,
      cursor: prevLoadedMessageId ? { id: prevLoadedMessageId } : undefined,
      where: { connectionId },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return messages;
  }

  async delete(data: DeleteMessageRequest): Promise<void> {
    const { messageId } = data;

    await prisma.$transaction(async trx => {
      const message = await trx.message.findFirstOrThrow({
        select,
        where: { id: messageId },
      });

      return trx.message.delete({ where: { id: message.id } });
    });
  }

  async get(messageId: string, trx?: Transaction): Promise<Message | undefined> {
    return await (trx || prisma).message.findFirstOrThrow({
      select,
      where: { id: messageId },
    });
  }
}
