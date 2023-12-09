import { ReactNode } from 'react';

import { Message, MessageAttachment } from '#/domain/message';

export type MessageProps = Pick<Message, 'createdAt' | 'attachments'> &
  Partial<Pick<Message, 'text' | 'isRead'>> & {
    children?: ReactNode;
    isMe: boolean;
    ownerName: string;
    avatarSrc?: string;
    isTyping?: boolean;
  };

export type AudioMessageProps = Omit<MessageProps, 'attachments'> & {
  audio: MessageAttachment;
};

export type ImageMessageProps = Omit<MessageProps, 'attachments'> & {
  image: MessageAttachment;
};

export type TextMessageProps = MessageProps;

export type TypingMessageProps = MessageProps;
