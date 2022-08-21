import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { MessageType } from "../../types";
import { api } from "../../lib/api";

export interface ChatStateType {
  messages: MessageType[];
  loading: boolean;
  error: string | SerializedError;
}

const initialState: ChatStateType = {
  messages: [],
  loading: false,
  error: "",
};

export const fetchRoomMessages = createAsyncThunk(
  "fetchRoomMessages",
  async (id: string) => {
    const res = await api.get(`/room-messages/${id}`);
    return res.data;
  }
);

export const sendMessage = createAsyncThunk(
  "sendMessage",
  async (data: MessageType) => {
    const res = await api.post("/send-message", data);
    return res.data;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // non async actions
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchRoomMessages.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchRoomMessages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.messages = [...state.messages, action.payload];
      state.loading = false;
      state.error = "";
    });
    builder.addCase(sendMessage.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const {} = chatSlice.actions;
export default chatSlice.reducer;
