import { Message } from '#/domain/message';

export enum MessageServerEvent {
  Created = 'SERVER:MESSAGE:CREATED',
}

export enum MessageClientEvent {
  Send = 'CLIENT:MESSAGE:SEND',
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
};

export type ListMessagesResponse = {
  messages: Message[];
};
