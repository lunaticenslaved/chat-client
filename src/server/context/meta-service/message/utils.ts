import { Prisma } from '@prisma/client';
import { Types } from '@prisma/client/runtime/library';

export const select: Prisma.MessageSelect<Types.Extensions.DefaultArgs> = {
  id: true,
  text: true,
  authorId: true,
  connectionId: true,
  createdAt: true,
};

export type SelectResponse = {
  id: string;
  text: string;
  authorId: string;
  connectionId: string;
  createdAt: Date;
};
