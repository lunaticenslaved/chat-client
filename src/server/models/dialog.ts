import { Dialog as DBDialog } from '@prisma/client';

// FIXME fix import path
import { User } from '@lunaticenslaved/schema/dist/types/models';

import { Message } from '#/domain/message';

export type DialogBase = Pick<DBDialog, 'id' | 'ownerId' | 'partnerId' | 'createdAt' | 'updatedAt'>;

export type DialogFull = DialogBase & {
  notReadMessagesCount: number;
  lastMessage?: Message;
};

export type DialogFullWithPartner = DialogFull & {
  partner: User;
};
