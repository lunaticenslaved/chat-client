import { PrismaClient } from '@prisma/client';

import { Message } from '@/models';

interface CreateMessageRequest {
  text: string;
  authorId: string;
  dialogId: string;
}
type CreateMessageResponse = Message;

const select = {
  text: true,
  id: true,
  authorId: true,
  dialogId: true,
  isRead: true,
  createdAt: true,
};

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

    return message;
  }
}
