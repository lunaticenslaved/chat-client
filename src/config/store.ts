import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { dialogsSlice } from "@/entities/dialog/store";
import { viewerSlice } from "@/entities/viewer/store";
import { messagesSlice } from "@/entities/message/store";
import { apiSlice } from "@/shared/api";

export const store = configureStore({
  reducer: {
    [dialogsSlice.name]: dialogsSlice.reducer,
    [viewerSlice.name]: viewerSlice.reducer,
    [messagesSlice.name]: messagesSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
