import { MessageModel } from "./types";

export interface InitialState {
  items: MessageModel[];
  isFetching: boolean;
}

export const initialState: InitialState = {
  items: [],
  isFetching: false,
};
