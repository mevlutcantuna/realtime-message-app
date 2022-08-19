import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomType } from "../types";
import { api } from "../lib/api";
import toast from "react-hot-toast";

interface InitialStateType {
  loading: boolean;
  room: RoomType | [];
  allRooms: RoomType[];
  error: string;
}

const initialState: InitialStateType = {
  loading: false,
  room: [],
  allRooms: [],
  error: "",
};

export const getAllRooms = createAsyncThunk("getAllRooms", async () => {
  const res = await api.get("/all-rooms");
  return res.data;
});

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    createRoom: (
      state: InitialStateType,
      action: PayloadAction<RoomType>
    ) => {},
    deleteRoom: (state: InitialStateType, action: PayloadAction<number>) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRooms.fulfilled, (state, action) => {
      state.allRooms = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getAllRooms.rejected, (state, action) => {
      state.allRooms = [];
      state.loading = false;
      //state.error = action.error.message;
      //toast.error(action.error.message)
    });
    builder.addCase(getAllRooms.pending, (state, action) => {
      state.allRooms = [];
      state.loading = true;
      state.error = "";
    });
  },
});

export const { createRoom, deleteRoom } = roomSlice.actions;
export default roomSlice.reducer;
