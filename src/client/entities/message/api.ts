import { MessageModel } from './types';

function getMessages() {
  return Promise.resolve({} as MessageAPI.GetMessagesResponse);
}

function createMessage(_: MessageAPI.CreateMessageRequest) {
  return Promise.resolve({} as MessageAPI.GetMessagesResponse);
}

export const MessageAPI = {
  getMessages,
  createMessage,
};

export namespace MessageAPI {
  export type GetMessagesResponse = {
    messages: MessageModel[];
  };

  export type CreateMessageRequest = {
    text: string;
  };
}
