import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import { ViewerModel } from "./types";

const reducers = {
  // TODO: перенести в апи?
  setViewer: (state: ViewerState, action: PayloadAction<ViewerModel | null>) => {
    state.viewer = action.payload;
  },
};

interface ViewerState {
  viewer: ViewerModel | null;
}

const initialState: ViewerState = {
  viewer: null,
};

const slice = createSlice({
  name: "viewer",
  initialState,
  reducers,
});

const selectors = {
  selectViewer: (state: { viewer: ViewerState }) => state.viewer.viewer,
};

export const ViewerStore = {
  slice,
  selectors,
  actions: slice.actions,
};
