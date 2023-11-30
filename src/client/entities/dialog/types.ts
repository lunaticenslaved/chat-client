import { User } from '@lunaticenslaved/schema/models';

export interface DialogModel {
  id: number;
  ownerId: string;
  partnerId: string;
  createdAt: string;
  updatedAt: string;
  notReadMessagesCount: number;
  lastMessage: LastMessage;
  partner: User;
}

export interface LastMessage {
  id: string;
  authorId: string;
  createdAt: string;
  text: string;
  isRead: boolean;
}
