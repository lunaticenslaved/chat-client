import { AttachmentModel, MessageModel } from "@/entities/message/types";
import { ReactNode } from "react";

export type MessageProps = Pick<MessageModel, "createdAt" | "attachments"> &
  Partial<Pick<MessageModel, "text" | "isRead">> & {
    children?: ReactNode;
    isMe: boolean;
    ownerName: string;
    avatarSrc?: string;
    isTyping?: boolean;
  };

export type AudioMessageProps = Omit<MessageProps, "attachments"> & {
  audio: AttachmentModel;
};

export type ImageMessageProps = Omit<MessageProps, "attachments"> & {
  image: AttachmentModel;
};

export type TextMessageProps = MessageProps;

export type TypingMessageProps = MessageProps;
