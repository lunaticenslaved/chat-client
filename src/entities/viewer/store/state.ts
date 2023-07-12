import { ViewerModel } from "../types";

export interface ViewerState {
  viewer: ViewerModel | null;
}

export const initialState: ViewerState = {
  viewer: null,
};
