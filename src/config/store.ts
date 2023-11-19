import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { DialogsStore } from '@/entities/dialog';
import { ViewerStore } from '@/entities/viewer';

export const store = configureStore({
  reducer: {
    [DialogsStore.slice.name]: DialogsStore.slice.reducer,
    [ViewerStore.slice.name]: ViewerStore.slice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
