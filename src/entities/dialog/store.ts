import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { DialogModel } from './types';

interface DialogsState {
  dialogs: DialogModel[];
  isFetching: boolean;
  currentDialogId?: DialogModel['id'];
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
    setCurrentDialogId(state, action: PayloadAction<DialogModel['id'] | undefined>) {
      state.currentDialogId = action.payload;
    },
    setDialogs(state, action: PayloadAction<DialogModel[]>) {
      state.dialogs = action.payload;
    },
  },
});

const selectors = {
  selectCurrentDialog: (state: { dialogs: DialogsState }) =>
    state.dialogs.dialogs.find(d => d.id === state.dialogs.currentDialogId),
  selectDialog: (state: { dialogs: DialogsState }) => (dialogId: DialogModel['id'] | undefined) =>
    state.dialogs.dialogs.find(d => d.id === dialogId),
};

export const DialogsStore = {
  slice,
  selectors,
  actions: slice.actions,
};
