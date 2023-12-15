import { Message } from '#/domain/message';

export type ListMessagesResponse = Message[];
export type ListMessagesRequest = {
  take: number;
  prevLoadedMessageId?: string;
  connectionId: string;
};

export type CreateMessageResponse = Message;
export interface CreateMessageRequest {
  text: string;
  authorId: string;
  connectionId: string;
}
