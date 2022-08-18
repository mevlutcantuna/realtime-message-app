import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from ".";
import { UserType } from "../types";

interface InitialStateType {
  user: UserType | boolean;
  loading: boolean;
}

const initialState: InitialStateType = {
  user: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state: InitialStateType,
      action: PayloadAction<UserType | boolean>
    ) => {
      state.user = action.payload;
    },
    setUserLoading: (
      state: InitialStateType,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setUserLoading } = authSlice.actions;
export default authSlice.reducer;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
