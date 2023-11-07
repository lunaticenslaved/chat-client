import { API } from "@/shared/api";

import { MessageModel } from "./types";

export type GetMessagesResponse = {
  messages: MessageModel[];
};

function getMessages() {
  return API.request<GetMessagesResponse>("/api/messages", {
    method: "GET",
  });
}

export const MessageAPI = {
  getMessages,
};
