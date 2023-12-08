import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { Viewer } from '../models';

import { DialogsStore } from './dialog';
import { ViewerStore } from './viewer';

export const createStore = (viewer?: Viewer) => {
  console.log('INITIAL USER', viewer);

  return configureStore({
    reducer: {
      [DialogsStore.slice.name]: DialogsStore.slice.reducer,
      [ViewerStore.slice.name]: ViewerStore.slice.reducer,
    },
    preloadedState: {
      viewer: {
        viewer,
      },
    },
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppState = ReturnType<AppStore['getState']>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const store = {
  [DialogsStore.slice.name]: DialogsStore,
  [ViewerStore.slice.name]: ViewerStore,
};
