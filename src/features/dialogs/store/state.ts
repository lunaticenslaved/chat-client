import { DialogModel } from "./types";

export interface DialogsState {
  items: DialogModel[];
  current: DialogModel | null;
}

export const initialState: DialogsState = {
  items: [],
  current: null,
};
