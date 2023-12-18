import { Message } from '#/domain/message';

export enum MessageServerEvent {
  Created = 'SERVER:MESSAGE:CREATED',
  Deleted = 'SERVER:MESSAGE:DELETED',
}

export enum MessageClientEvent {
  Send = 'CLIENT:MESSAGE:SEND',
  Delete = 'CLIENT:MESSAGE:DELETE',
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
  connectionId: string;
  messageId: string;
};
export type DeleteMessageResponse = {
  connectionId: string;
  messageId: string;
};
