import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "app";

import { initialState } from "./state";
import { reducers } from "./reducers";

export const viewerSlice = createSlice({
  name: "viewer",
  initialState,
  reducers,
});

export const viewerSelectors = {
  selectViewer: (state: RootState) => state.viewer.viewer,
  selectIsAuthorized: (state: RootState) => !!state.viewer.viewer,
  selectIsActivated: (state: RootState) => !!state.viewer.viewer?.isActivated,
};

export const viewerActions = viewerSlice.actions;
