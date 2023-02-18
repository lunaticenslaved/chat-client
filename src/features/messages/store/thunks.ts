import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import { MessageModel } from "./types";

export const fetchMessagesForDialogId = createAsyncThunk(
  "messages/fetchMessages",
  async (id: MessageModel["id"] | null) => {
    if (id === null) return [];

    try {
      const response = await axios.get<MessageModel[]>("/messages");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
);
