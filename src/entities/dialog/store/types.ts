export interface DialogModel {
  id: number;
  user: UserModel;
  notReadMessages: number;
  lastMessage: LastMessage;
}

export interface UserModel {
  id: number;
  isOnline: boolean;
  name: string;
  avatar: string | null;
}

export interface LastMessage {
  senderId: string;
  createdAt: string;
  text: string;
  isRead: boolean;
}
