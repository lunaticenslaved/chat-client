import dayjs from '#/client/shared/lib/dayjs';

import { User } from './user';

export type Message = {
  id: string;
  text: string;
  createdAt: string;
  isRead: boolean;
  authorId: string;
  author: User;
  connectionId: string;
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
  message: Pick<Message, 'authorId'>;
};

export function canDeleteMessage({ viewerId, message }: CanDeleteMessage) {
  return message.authorId === viewerId;
}
