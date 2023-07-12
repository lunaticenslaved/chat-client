import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "store";

import { initialState } from "./state";
import { reducers } from "./reducers";

export const viewerSlice = createSlice({
  name: "viewer",
  initialState,
  reducers,
});

export const viewerSelectors = {
  selectViewer: (state: RootState) => state.viewer.viewer,
};

export const viewerActions = viewerSlice.actions;
