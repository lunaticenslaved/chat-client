import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Viewer } from '../models';

const reducers = {
  setViewer: (state: ViewerState, action: PayloadAction<Viewer | undefined>) => {
    state.viewer = action.payload || undefined;
  },
};

interface ViewerState {
  viewer?: Viewer;
}

const initialState: ViewerState = {};

const slice = createSlice({
  name: 'viewer',
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
