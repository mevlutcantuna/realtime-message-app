import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomType } from "../types";

interface InitialStateType {
  loading: boolean;
  room: RoomType | [];
}

const initialState: InitialStateType = {
  loading: false,
  room: [],
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    createRoom: (
      state: InitialStateType,
      action: PayloadAction<RoomType>
    ) => {},
    deleteRoom: (state: InitialStateType, aciton: PayloadAction<number>) => {},
  },
});

export const { createRoom, deleteRoom } = roomSlice.actions;
export default roomSlice.reducer;
