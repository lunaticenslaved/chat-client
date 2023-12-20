import { Prisma } from '@prisma/client';
import { Types } from '@prisma/client/runtime/library';

import { Message } from '../messages';

export const select: Prisma.ConnectionSelect<Types.Extensions.DefaultArgs> = {
  id: true,
  users: {
    select: {
      id: true,
    },
  },
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

export type Connection = {
  id: string;
  users: { id: string }[];
  messages: Array<Message>;
  oneToOneDialog: { id: string } | null;
};

export type OneToOneConnection = Omit<Connection, 'oneToOneDialog'> & {
  oneToOneDialog: { id: string };
};
