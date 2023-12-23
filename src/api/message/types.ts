import { Message } from '#/domain/message';

export enum MessageServerEvent {
  Created = 'SERVER:MESSAGE:CREATED',
  Deleted = 'SERVER:MESSAGE:DELETED',
  Updated = 'SERVER:MESSAGE:UPDATED',
}

export enum MessageClientEvent {
  Send = 'CLIENT:MESSAGE:SEND',
  Delete = 'CLIENT:MESSAGE:DELETE',
  Read = 'CLIENT:MESSAGE:READ',
}

export type SendMessageResponse = Message;
export type SendMessageRequest =
  | {
      text: string;
      userId: string;
    }
  | {
      text: string;
      connectionId: string;
    };

export type ListMessagesRequest = {
  connectionId: string;
  take: number;
  prevLoadedMessageId?: string;
};

export type ListMessagesResponse = {
  messages: Message[];
};

export type DeleteMessageRequest = {
  messageId: string;
};
export type DeleteMessageResponse = {
  connectionId: string;
  messageId: string;
};

export interface ReadMessageRequest {
  messageId: string;
}

export type MessageUpdatedResponse = Message;
