import { Message as DBMessage } from '@prisma/client';

export type Message = Pick<
  DBMessage,
  'id' | 'authorId' | 'dialogId' | 'text' | 'createdAt' | 'isRead'
>;
