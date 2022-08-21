import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: true,
  },
  created_date: {
    type: Date,
    required: true,
  },
  room_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Room",
    required: true,
  },
  user: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    id: {
      type: String,
      required: true,
      trim: true,
    },
  },
});

export default mongoose.model("Message", MessageSchema);
