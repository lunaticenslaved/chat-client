import { User } from './user';

export type Dialog = {
  user: User;
  id: string;
  notReadMessagesCount?: number;
  lastMessage?: LastMessage;
};

interface LastMessage {
  id: string;
  authorId: string;
  createdAt: string;
  text: string;
  isRead: boolean;
}
