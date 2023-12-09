import { PrismaClient } from '@prisma/client';

import {
  CreateMessageRequest,
  CreateMessageResponse,
  ListMessagesRequest,
  ListMessagesResponse,
} from './types';
import { select } from './utils';

export * from './types';

export class MessageService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async list(data: ListMessagesRequest): Promise<ListMessagesResponse> {
    const messages = await this.prisma.message.findMany({
      select,
      take: data.take,
      orderBy: {
        createdAt: 'asc',
      },
      where: {
        dialogId: data.dialogId,
      },
    });

    return messages.map(message => ({
      id: message.id,
      text: message.text,
      authorId: message.authorId,
      createdAt: message.createdAt.toISOString(),
      isRead: message.isRead,
      attachments: [],
    }));
  }

  async create(data: CreateMessageRequest): Promise<CreateMessageResponse> {
    const message = await this.prisma.message.create({
      select,
      data: {
        text: data.text,
        dialogId: data.dialogId,
        authorId: data.authorId,
      },
    });

    return {
      id: message.id,
      text: message.text,
      authorId: message.authorId,
      createdAt: message.createdAt.toISOString(),
      isRead: message.isRead,
      attachments: [],
    };
  }
}
