import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  user_id: {
    type: String,
    require: true,
    trim: true,
  },
  created_date: {
    type: Date,
    require: true,
    trim: true,
  },
  updated_date: {
    type: Date,
    require: true,
    trim: true,
  },
});

export default mongoose.model("Room", RoomSchema);
