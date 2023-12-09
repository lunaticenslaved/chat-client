import { Message } from '#/domain/message';

export interface CreateMessageRequest {
  text: string;
  authorId: string;
  dialogId: string;
}
export type CreateMessageResponse = Omit<Message, 'author'>;
