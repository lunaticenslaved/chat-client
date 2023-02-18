import { MessageModel } from "./types";

export interface InitialState {
  items: MessageModel[];
}

export const initialState: InitialState = {
  items: [],
};
