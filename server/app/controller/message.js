import Room from "../model/room.js";
import Message from "../model/message.js";

export const sendMessage = async (req, res, next) => {
  const { room_id, content, created_date, user } = req.body;
  try {
    // check room exists
    const room = await Room.findById(room_id);
    if (!room) return res.status(400).json({ message: "Room does not found" });

    // create message
    const message = new Message({ room_id, content, created_date, user });
    await message.save();

    return res.status(201).json({ ...message._doc });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getRoomMessages = async (req, res, next) => {
  const { id } = req.params;

  try {
    // check room exists
    const room = await Room.findById(id);
    if (!room) return res.status(400).json({ message: "Room does not found" });

    // get messages for a room
    const messages = await Message.find({ room_id: id });
    return res.status(200).json(messages);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
