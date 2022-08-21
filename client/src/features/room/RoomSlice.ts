import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { RoomType } from "../../types";
import { api } from "../../lib/api";

export interface RoomStateType {
  selectedRoom: {
    data: RoomType | null;
    loading: boolean;
    error: string | SerializedError;
  };
  allRooms: {
    data: RoomType[];
    loading: boolean;
    error: string | SerializedError;
  };
}

const initialState: RoomStateType = {
  selectedRoom: {
    data: null,
    loading: false,
    error: "",
  },
  allRooms: {
    data: [],
    loading: false,
    error: "",
  },
};

export const fetchAllRooms = createAsyncThunk("fetchAllRooms", async () => {
  const res = await api.get("/all-rooms");
  return res.data;
});

interface dataType {
  name: string;
  user_id: string;
  updated_date: Date;
  created_date: Date;
}

export const createRoom = createAsyncThunk(
  "createRoom",
  async ({ name, user_id, created_date, updated_date }: dataType) => {
    const res = await api.post("/room", {
      name,
      user_id,
      created_date,
      updated_date,
    });
    return res.data;
  }
);

export const deleteRoom = createAsyncThunk("deleteRoom", async (id: string) => {
  const res = await api.delete(`/room/${id}`);
  return res.data;
});

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    // non-async actions
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllRooms.fulfilled, (state, action) => {
      state.allRooms.data = action.payload;
      state.allRooms.loading = false;
      state.allRooms.error = "";
    });
    builder.addCase(fetchAllRooms.pending, (state, action) => {
      state.allRooms.loading = true;
      state.allRooms.error = "";
    });
    builder.addCase(fetchAllRooms.rejected, (state, action) => {
      state.allRooms.data = [];
      state.allRooms.loading = false;
      state.allRooms.error = action.error;
    });
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.allRooms.data = [action.payload, ...state.allRooms.data];
      state.allRooms.loading = false;
      state.allRooms.error = "";
    });
    builder.addCase(createRoom.pending, (state, action) => {
      state.allRooms.loading = true;
      state.allRooms.error = "";
    });
    builder.addCase(createRoom.rejected, (state, action) => {
      state.allRooms.loading = false;
      state.allRooms.error = action.error;
    });
    builder.addCase(deleteRoom.fulfilled, (state, action) => {
      state.allRooms.data = state.allRooms.data.filter((room: RoomType) => {
        return room._id !== action.payload._id;
      });
      state.allRooms.loading = false;
      state.allRooms.error = "";
    });
    builder.addCase(deleteRoom.pending, (state, action) => {
      state.allRooms.loading = true;
      state.allRooms.error = "";
    });
    builder.addCase(deleteRoom.rejected, (state, action) => {
      state.allRooms.loading = false;
      state.allRooms.error = action.error;
    });
  },
});

export const {} = roomSlice.actions;
export default roomSlice.reducer;
