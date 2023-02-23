import { PayloadAction } from "@reduxjs/toolkit";

import { AuthResponse } from "../types";
import { ViewerState } from "./state";
import { decodeViewer } from "./_lib";

export const reducers = {
  setUnauthorized: (state: ViewerState) => {
    state.viewer = null;
    localStorage.removeItem("token");
  },
  setAuthorized: (state: ViewerState, action: PayloadAction<AuthResponse>) => {
    state.viewer = decodeViewer(action.payload.accessToken);
    localStorage.setItem("token", action.payload.accessToken);
  },
};
