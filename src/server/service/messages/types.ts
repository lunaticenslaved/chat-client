export type ListMessagesRequest = {
  take: number;
  prevLoadedMessageId?: string;
  connectionId: string;
};

export interface CreateMessageRequest {
  text: string;
  authorId: string;
  connectionId: string;
}
