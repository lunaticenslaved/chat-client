import { Message } from '#/domain/message';

export type CreateMessageResponse = Omit<Message, 'author'>;
export interface CreateMessageRequest {
  text: string;
  authorId: string;
  dialogId: string;
}

export type ListMessagesResponse = Omit<Message, 'author'>[];
export type ListMessagesRequest = {
  take: number;
  dialogId: string;
};
