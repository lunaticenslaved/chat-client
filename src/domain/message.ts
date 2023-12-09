import { User } from './user';

export type Message = {
  id: string;
  text: string;
  createdAt: string;
  isRead: boolean;
  author: User;
  attachments: MessageAttachment[];
};

export type MessageAttachment = {
  id: number;
  filename: string;
  url: string;
  type: 'image' | 'audio';
};
