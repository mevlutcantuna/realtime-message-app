import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import roomReducer from "../features/room/RoomSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
