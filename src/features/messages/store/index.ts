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
    build.addCase(thunks.fetchMessagesForDialogId.pending, (state) => {
      state.items = [];
      state.isFetching = true;
    });
    build.addCase(
      thunks.fetchMessagesForDialogId.fulfilled,
      (state, action) => {
        state.isFetching = false;
        state.items = action.payload;
      }
    );
    build.addCase(thunks.fetchMessagesForDialogId.rejected, (state) => {
      state.isFetching = false;
      state.items = [];
    });
  },
});

export const messagesSelectors = {
  selectMessages: (state: RootState) => state.messages.items,
  selectIsFetching: (state: RootState) => state.messages.isFetching,
};

export const messagesActions = {
  ...messagesSlice.actions,
  ...thunks,
};
