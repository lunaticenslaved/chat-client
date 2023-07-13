import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "config/store";

import { initialState } from "./state";
import { DialogModel } from "./types";

export const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    setCurrentDialog: (state, action: PayloadAction<DialogModel | null>) => {
      state.current = action.payload;
    },
  },
});

export type { DialogModel, UserModel } from "./types";

export const dialogsActions = {
  ...dialogsSlice.actions,
};

export const dialogsSelectors = {
  selectCurrentDialog: (state: RootState) => state.dialogs.current,
  selectDialog: (state: RootState) => (dialogId: DialogModel["id"]) =>
    state.dialogs.items.find((d) => d.id === dialogId),
};
