import { Message } from '#/domain/message';

export enum MessageServerEvent {
  Created = 'SERVER:MESSAGE:CREATED',
}

export enum MessageClientEvent {
  Send = 'CLIENT:MESSAGE:SEND',
  List = 'CLIENT:MESSAGE:LIST',
}

export type ListMessagesResponse = Message[];
export type ListMessagesRequest = {
  dialogId: string;
  take: number;
};

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
