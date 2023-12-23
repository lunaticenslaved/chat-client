import { Prisma } from '@prisma/client';
import { Types } from '@prisma/client/runtime/library';

import { Message, selectMessage } from '../messages';

export const select: Prisma.ConnectionSelect<Types.Extensions.DefaultArgs> = {
  id: true,
  users: {
    select: {
      id: true,
    },
  },
  messages: {
    take: 1,
    select: selectMessage,
    orderBy: { createdAt: 'desc' },
  },
  oneToOneDialog: {
    select: { id: true },
  },
  groupDialog: {
    select: { id: true },
  },
};

type ConnectionCommon = {
  id: string;
  users: { id: string }[];
  messages: Array<Message>;
  oneToOneDialog: { id: string } | null;
  groupDialog: { id: string } | null;
};

export type OneToOneConnection = ConnectionCommon & {
  oneToOneDialog: { id: string };
};

export type GroupConnection = ConnectionCommon & {
  groupDialog: { id: string };
};

export type Connection = OneToOneConnection | GroupConnection;

export function isOneToOneConnection(connection: Connection): connection is OneToOneConnection {
  return !!connection.oneToOneDialog;
}

export function isGroupConnection(connection: Connection): connection is GroupConnection {
  return !!connection.groupDialog;
}
