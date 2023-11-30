import { API } from '@/shared/api';

import { MessageModel } from './types';

function getMessages() {
  return API.request<MessageAPI.GetMessagesResponse>('/api/messages', {
    method: 'GET',
  });
}

function createMessage(data: MessageAPI.CreateMessageRequest) {
  return API.request('/api/messages', {
    method: 'POST',
    body: JSON.stringify(data),
  });
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
