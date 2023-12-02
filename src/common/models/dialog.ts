import { User } from './user';

export interface Dialog {
  id: number;
  ownerId: string;
  partnerId: string;
  createdAt: string;
  updatedAt: string;
  notReadMessagesCount: number;
  lastMessage: LastMessage;
  partner: User;
}

interface LastMessage {
  id: string;
  authorId: string;
  createdAt: string;
  text: string;
  isRead: boolean;
}
