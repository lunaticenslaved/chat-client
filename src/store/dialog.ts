import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Connection } from '#/domain/connection';

interface DialogsState {
  search?: string;
  currentDialog?: Connection;
  dialogs: Connection[];
}

const initialState: DialogsState = {
  dialogs: [],
};

const slice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    setCurrentDialog(state, action: PayloadAction<Connection | undefined>) {
      state.currentDialog = action.payload;
    },
    setSearch(state, action: PayloadAction<string | undefined>) {
      state.search = action.payload;
    },
    setDialogs(state, action: PayloadAction<Connection[]>) {
      state.dialogs = action.payload;
    },
  },
});

const selectors = {
  selectCurrentDialog: (state: { dialogs: DialogsState }) => state.dialogs.currentDialog,
  selectDialogs: (state: { dialogs: DialogsState }) => state.dialogs.dialogs,
};

export const DialogsStore = {
  slice,
  selectors,
  actions: slice.actions,
};
