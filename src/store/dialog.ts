import { Dialog } from '@domain/dialog';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface DialogsState {
  currentDialog?: Dialog;
}

const initialState: DialogsState = {};

const slice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    setCurrentDialogId(state, action: PayloadAction<Dialog | undefined>) {
      state.currentDialog = action.payload;
    },
  },
});

const selectors = {
  selectCurrentDialog: (state: { dialogs: DialogsState }) => state.dialogs.currentDialog,
};

export const DialogsStore = {
  slice,
  selectors,
  actions: slice.actions,
};
