import { Prisma } from '@prisma/client';
import { Types } from '@prisma/client/runtime/library';

import { User } from '../users';
import { select as userSelect } from '../users/utils';

export const select: Prisma.ContactSelect<Types.Extensions.DefaultArgs> = {
  id: true,
  name: true,
  user: {
    select: userSelect,
  },
};

export interface Contact {
  id: string;
  name: string | null;
  user: User;
}
