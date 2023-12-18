import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Message } from '#/domain/message';

interface MessagesState {
  messages: Message[];
}

const initialState: MessagesState = {
  messages: [],
};

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<Message>) {
      console.log('MESSAGE RECEIVED', action.payload);

      state.messages = [...state.messages, action.payload];
    },
    removeMessage(state, action: PayloadAction<{ messageId: string }>) {
      console.log('MESSAGE REMOVED', action.payload);

      state.messages = state.messages.filter(({ id }) => id !== action.payload.messageId);
    },
    prependMessages(state, action: PayloadAction<Message[]>) {
      console.log('PREPEND MESSAGES', action.payload);

      state.messages = [...action.payload, ...state.messages];
    },
  },
});

const selectors = {
  selectMessages: (state: { messages: MessagesState }) => state.messages.messages,
};

export const MessagesStore = {
  slice,
  selectors,
  actions: slice.actions,
};
