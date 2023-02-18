import { configureStore } from "@reduxjs/toolkit";

import { dialogsSlice } from "features/dialogs/store";
import { viewerSlice } from "features/viewer";

export const store = configureStore({
  reducer: {
    [dialogsSlice.name]: dialogsSlice.reducer,
    [viewerSlice.name]: viewerSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
