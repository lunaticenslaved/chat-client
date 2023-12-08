import { User } from './user';

export interface Dialog {
  id?: number;
  notReadMessagesCount?: number;
  lastMessage?: LastMessage;
  user: User;
}

interface LastMessage {
  id: string;
  authorId: string;
  createdAt: string;
  text: string;
  isRead: boolean;
}

export function isExistingDialog(dialog: Dialog): boolean {
  return !!dialog.id;
}

export function createNewDialog(user: User): Dialog {
  return { user };
}
