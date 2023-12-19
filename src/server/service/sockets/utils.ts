import { Prisma } from '@prisma/client';
import { Types } from '@prisma/client/runtime/library';

export const select: Prisma.SocketSelect<Types.Extensions.DefaultArgs> = {
  id: true,
};

export type Socket = {
  id: string;
};
