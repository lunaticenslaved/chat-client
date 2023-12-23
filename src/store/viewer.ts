import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Viewer } from '../domain/viewer';

interface ViewerState {
  isOnline: boolean;
  viewer?: Viewer;
}

const initialState: ViewerState = {
  isOnline: false,
};

const reducers = {
  setOnline(state: ViewerState, action: PayloadAction<boolean>) {
    state.isOnline = action.payload;
  },
  setViewer(state: ViewerState, action: PayloadAction<Viewer | undefined>) {
    state.viewer = action.payload || undefined;
  },
};

const selectors = {
  selectIsOnline: (state: { viewer: ViewerState }) => state.viewer.isOnline,
  selectViewer: (state: { viewer: ViewerState }) => state.viewer.viewer,
};

const slice = createSlice({
  name: 'viewer',
  initialState,
  reducers,
});

export const ViewerStore = {
  slice,
  selectors,
  actions: slice.actions,
};
