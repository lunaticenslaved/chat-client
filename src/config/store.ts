import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { DialogsStore } from "@/entities/dialog";
import { viewerSlice } from "@/entities/viewer/store";

export const store = configureStore({
  reducer: {
    [DialogsStore.slice.name]: DialogsStore.slice.reducer,
    [viewerSlice.name]: viewerSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
