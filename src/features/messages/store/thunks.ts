import { createAsyncThunk } from "@reduxjs/toolkit";

import { $api } from "shared/api";

import { MessageModel } from "./types";

export const fetchMessagesForDialogId = createAsyncThunk(
  "messages/fetchMessages",
  async (id: MessageModel["id"] | null) => {
    if (id === null) return [];

    const response = await $api.get<MessageModel[]>("/messages");
    return response.data;
  }
);
