import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import room from "./room";

export const store = configureStore({
  reducer: {
    auth,
    room,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
