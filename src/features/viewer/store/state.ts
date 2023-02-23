import { ViewerModel } from "../types";
import { decodeViewer } from "./_lib";

export interface ViewerState {
  viewer: ViewerModel | null;
}

export const initialState: ViewerState = {
  viewer: decodeViewer(),
};
