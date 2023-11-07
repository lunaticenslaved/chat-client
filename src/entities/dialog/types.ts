export interface DialogModel {
  id: number;
  notReadMessages: number;
  lastMessage: LastMessage;
  user: UserModel;
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
