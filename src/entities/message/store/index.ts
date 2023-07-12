import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./state";

export type { MessageModel, AttachmentModel } from "./types";

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
});

export const messagesActions = {
  ...messagesSlice.actions,
};
