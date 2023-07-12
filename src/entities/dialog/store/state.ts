import { DialogModel } from "./types";

export interface DialogsState {
  items: DialogModel[];
  isFetching: boolean;
  current: DialogModel | null;
}

export const initialState: DialogsState = {
  items: [],
  current: null,
  isFetching: false,
};
