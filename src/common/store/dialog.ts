import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Dialog } from '../models';

interface DialogsState {
  dialogs: Dialog[];
  isFetching: boolean;
  currentDialogId?: Dialog['id'];
}

const initialState: DialogsState = {
  dialogs: [],
  currentDialogId: undefined,
  isFetching: false,
};

const slice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    setCurrentDialogId(state, action: PayloadAction<Dialog['id'] | undefined>) {
      state.currentDialogId = action.payload;
    },
    setDialogs(state, action: PayloadAction<Dialog[]>) {
      state.dialogs = action.payload;
    },
  },
});

const selectors = {
  selectCurrentDialog: (state: { dialogs: DialogsState }) =>
    state.dialogs.dialogs.find(d => d.id === state.dialogs.currentDialogId),
  selectDialog: (state: { dialogs: DialogsState }) => (dialogId: Dialog['id'] | undefined) =>
    state.dialogs.dialogs.find(d => d.id === dialogId),
};

export const DialogsStore = {
  slice,
  selectors,
  actions: slice.actions,
};
