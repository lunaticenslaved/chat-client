import { PayloadAction } from "@reduxjs/toolkit";

import { ViewerModel } from "../types";
import { ViewerState } from "./state";

export const reducers = {
  // TODO: перенести в апи?
  setViewer: (
    state: ViewerState,
    action: PayloadAction<ViewerModel | null>
  ) => {
    state.viewer = action.payload;
  },
};
