import { Message } from '@domain/message';

export enum MessageEvent {
  send = 'message:send',
}

export type CreateMessageRequest =
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

export type CreateMessageResponse = Message;
