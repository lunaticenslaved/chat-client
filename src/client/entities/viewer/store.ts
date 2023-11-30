import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { ViewerModel } from './types';

const reducers = {
  setViewer: (state: ViewerState, action: PayloadAction<ViewerModel | undefined>) => {
    state.viewer = action.payload || undefined;
  },
};

interface ViewerState {
  viewer?: ViewerModel;
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
