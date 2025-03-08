import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import conversationSlice from "./conversationSlice";

export const store = configureStore({
  reducer: {
    conv: conversationSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
