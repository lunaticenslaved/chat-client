import { ReactNode } from 'react';

import { Message, MessageAttachment } from '#/domain/message';

export type MessageProps = Pick<Message, 'createdAt' | 'attachments'> & {
  children?: ReactNode;
  isMe: boolean;
  text?: string;
  isRead: boolean;
  ownerName: string;
  avatar(props: { size: string }): ReactNode;
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
