import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "app";

import { initialState } from "./state";
import * as thunks from "./thunks";

export type { MessageModel, AttachmentModel } from "./types";

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(thunks.fetchMessagesForDialogId.pending, (state, action) => {
      state.items = [];
    });
    build.addCase(
      thunks.fetchMessagesForDialogId.fulfilled,
      (state, action) => {
        state.items = action.payload;
      }
    );
  },
});

export const messagesSelectors = {
  selectMessages: (state: RootState) => state.messages.items,
};

export const messagesActions = {
  ...messagesSlice.actions,
  ...thunks,
};
