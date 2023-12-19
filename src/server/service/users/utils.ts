import { Prisma } from '@prisma/client';
import { Types } from '@prisma/client/runtime/library';

export const select: Prisma.UserSelect<Types.Extensions.DefaultArgs> = {
  id: true,
  isOnline: true,
};

export type User = {
  id: string;
  isOnline: boolean;
};
