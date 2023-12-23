import { Prisma } from '@prisma/client';
import { Types } from '@prisma/client/runtime/library';

import { User } from '#/server/service/users';

export const select: Prisma.MessageSelect<Types.Extensions.DefaultArgs> = {
  id: true,
  text: true,
  authorId: true,
  connectionId: true,
  createdAt: true,
  isReadByUsers: {
    select: {
      id: true,
    },
  },
};

export type Message = {
  id: string;
  text: string;
  authorId: string;
  connectionId: string;
  createdAt: Date;
  isReadByUsers: Pick<User, 'id'>[];
};
