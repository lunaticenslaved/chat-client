import { DeleteMessageRequest } from '#/api/message';
import { prisma } from '#/server/context';
import { Transaction } from '#/server/shared/prisma';

import { BaseService } from '../base-service';

import {
  CanSendMessageToUserRequest,
  CreateMessageRequest,
  ListMessagesRequest,
  MarkMessageAsReadRequest,
} from './types';
import { Message, select } from './utils';

export class MessagesService extends BaseService {
  create(data: CreateMessageRequest, trx?: Transaction): Promise<Message> {
    return (trx || prisma).message.create({ select, data });
  }

  list(data: ListMessagesRequest, trx?: Transaction): Promise<Message[]> {
    const { connectionId, take, prevLoadedMessageId } = data;

    return (trx || prisma).message
      .findMany({
        select,
        take,
        skip: prevLoadedMessageId ? 1 : undefined,
        cursor: prevLoadedMessageId ? { id: prevLoadedMessageId } : undefined,
        where: { connectionId },
        orderBy: {
          createdAt: 'desc',
        },
      })
      .then(data => data.reverse());
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

  canSendMessageToUser({ fromUser, toUser }: CanSendMessageToUserRequest): Promise<boolean> {
    return prisma.user
      .findFirst({
        where: {
          usersWhoBlockedMe: {
            some: { id: { in: [fromUser, toUser] } },
          },
          blockedUsers: {
            some: { id: { in: [fromUser, toUser] } },
          },
        },
      })
      .then(data => !data);
  }

  markAsRead({ messageId, userId }: MarkMessageAsReadRequest): Promise<Message> {
    return prisma.message.update({
      select,
      where: { id: messageId },
      data: {
        isReadByUsers: { connect: { id: userId } },
      },
    });
  }
}
