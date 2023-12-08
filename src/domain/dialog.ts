import { User } from './user';

export type ExistingDialog = {
  user: User;
  id: string;
  notReadMessagesCount?: number;
  lastMessage?: LastMessage;
};

export type NewDialog = {
  user: User;
};

export type Dialog = ExistingDialog | NewDialog;

interface LastMessage {
  id: string;
  authorId: string;
  createdAt: string;
  text: string;
  isRead: boolean;
}

export function isExistingDialog(dialog: Dialog): dialog is ExistingDialog {
  return 'id' in dialog && !!dialog.id;
}

export function createNewDialog(user: User): Dialog {
  return { user };
}
