import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "app";

import { initialState } from "./state";
import { DialogModel } from "./types";
import * as thunks from "./thunks";

export const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    setCurrentDialog: (state, action: PayloadAction<DialogModel | null>) => {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunks.fetchDialogs.pending, (state) => {
      state.isFetching = true;
      state.items = [];
    });
    builder.addCase(thunks.fetchDialogs.fulfilled, (state, action) => {
      state.isFetching = false;
      state.items = action.payload;
    });
    builder.addCase(thunks.fetchDialogs.rejected, (state) => {
      state.isFetching = false;
      state.items = [];
    });
  },
});

export type { DialogModel, UserModel } from "./types";

export const dialogsActions = {
  ...dialogsSlice.actions,
  ...thunks,
};

export const dialogsSelectors = {
  selectCurrentDialog: (state: RootState) => state.dialogs.current,
  selectIsFetching: (state: RootState) => state.dialogs.isFetching,
  selectDialogs: (state: RootState) => state.dialogs.items,
  selectDialog: (state: RootState) => (dialogId: DialogModel["id"]) =>
    state.dialogs.items.find((d) => d.id === dialogId),
};
