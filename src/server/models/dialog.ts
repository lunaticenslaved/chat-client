import { Dialog as DBDialog } from '@prisma/client';

// FIXME fix import path
import { User } from '@lunaticenslaved/schema/dist/types/models';

import { Message } from '@/models';

export type DialogBase = Pick<DBDialog, 'id' | 'ownerId' | 'partnerId' | 'createdAt' | 'updatedAt'>;

export type DialogFull = DialogBase & {
  notReadMessagesCount: number;
  lastMessage?: Pick<Message, 'id' | 'text' | 'createdAt' | 'isRead' | 'authorId'>;
};

export type DialogFullWithPartner = DialogFull & {
  partner: User;
};
