import { PrismaClient } from '@prisma/client';

import { CreateMessageRequest, CreateMessageResponse } from './types';
import { select } from './utils';

export class MessageService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
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
      createdAt: message.createdAt.toISOString(),
    };
  }
}
