import { User } from './user';

export type Message = {
  id: string;
  text: string;
  createdAt: string;
  authorId: string;
  author: User;
  connectionId: string;
  isReadByUsers: Pick<User, 'id'>[];
  attachments: MessageAttachment[];
};

export type MessageAttachment = {
  id: number;
  filename: string;
  url: string;
  type: 'image' | 'audio';
};

type CanDeleteMessage = {
  viewerId: string;
  authorId: string;
};

export function canDeleteMessage({ viewerId, authorId }: CanDeleteMessage) {
  return authorId === viewerId;
}
