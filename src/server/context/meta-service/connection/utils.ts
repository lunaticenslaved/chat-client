import { Prisma } from '@prisma/client';
import { Types } from '@prisma/client/runtime/library';

export const select: Prisma.ConnectionSelect<Types.Extensions.DefaultArgs> = {
  id: true,
  users: true,
  messages: {
    take: 1,
    select: {
      id: true,
      text: true,
      createdAt: true,
      authorId: true,
      connectionId: true,
    },
    orderBy: { createdAt: 'desc' },
  },
  oneToOneDialog: {
    select: { id: true },
  },
};

export type SelectResponse = {
  id: string;
  users: string[];
  messages: Array<{
    id: string;
    text: string;
    createdAt: Date;
    authorId: string;
    connectionId: string;
  }>;
  oneToOneDialog: {
    id: string;
  } | null;
};
