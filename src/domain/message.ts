import dayjs from '#/client/shared/lib/dayjs';

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

export function formatMessageTime(date: string | Date, type?: 'exact'): string {
  if (type === 'exact') {
    return dayjs(date).format('LLL');
  }

  return dayjs(date).fromNow();
}

type CanDeleteMessage = {
  viewerId: string;
  authorId: string;
};

export function canDeleteMessage({ viewerId, authorId }: CanDeleteMessage) {
  return authorId === viewerId;
}
