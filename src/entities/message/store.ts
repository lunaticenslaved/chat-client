import { createSlice } from "@reduxjs/toolkit";

import { MessageModel } from "./types";

interface InitialState {
  items: MessageModel[];
  isFetching: boolean;
}

const initialState: InitialState = {
  items: [],
  isFetching: false,
};

const slice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
});

const actions = {
  ...slice.actions,
};

export const MessagesStore = {
  slice,
  actions,
};
