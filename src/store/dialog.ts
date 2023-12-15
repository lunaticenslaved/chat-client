import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Connection } from '#/domain/connection';
import { Message } from '#/domain/message';

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
    addConnection(state, action: PayloadAction<Connection>) {
      console.log('CONNECTION CREATED', action.payload);

      // FIXME filter by last message date
      state.dialogs = [action.payload, ...state.dialogs];
    },
    updateLastMessage(state, action: PayloadAction<Message>) {
      const message = action.payload;

      state.dialogs = state.dialogs.map(connection => {
        if (connection.id === message.connectionId) {
          connection.lastMessage = message;
        }

        return connection;
      });
    },
  },
});

const selectors = {
  selectCurrentDialog: (state: { dialogs: DialogsState }) => state.dialogs.currentDialog,
  selectDialogs: (state: { dialogs: DialogsState }) => state.dialogs.dialogs,
  selectSearch: (state: { dialogs: DialogsState }) => state.dialogs.search,
};

export const DialogsStore = {
  slice,
  selectors,
  actions: slice.actions,
};
