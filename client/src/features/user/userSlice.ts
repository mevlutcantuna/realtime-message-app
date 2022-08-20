import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types";

export interface UserStateType {
  user: UserType | null;
}

const initialState: UserStateType = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
