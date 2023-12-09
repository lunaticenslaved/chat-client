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
      type: 'new_dialog';
      text: string;
      userId: string;
      viewerId: string;
    }
  | {
      type: 'old_dialog';
      text: string;
      dialogId: string;
      viewerId: string;
    };

export type ListMessagesRequest = {
  dialogId: string;
  take: number;
};

export type ListMessagesResponse = {
  messages: Message[];
};
