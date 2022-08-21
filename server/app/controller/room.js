import Room from "../model/room.js";
import Message from "../model/message.js";

export const getRoom = async (req, res, next) => {
  const id = req.params.id;
  try {
    // id must be required
    if (!id) {
      return res.status(400).json({ message: "id is required." });
    }

    // get room
    const room = await Room.findById(id);

    return res.status(200).json({ ...room._doc });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const allRooms = await Room.find({}).sort({ updated_date: "descending" });
    return res.status(200).json(allRooms);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createRoom = async (req, res, next) => {
  const { name, user_id, created_date, updated_date } = req.body;
  try {
    // name must not be empty
    name === "" && res.status(400).json({ message: "Please provide name" });

    // if there is room with same name
    const exists = await Room.findOne({ name });
    if (exists) {
      return res.status(400).json({
        message: "There is room with same name, please type another room name",
      });
    }

    // create and save new room
    const newRoom = new Room({ name, user_id, created_date, updated_date });
    await newRoom.save();
    return res.status(201).json({ ...newRoom._doc });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res, next) => {
  const id = req.params.id;
  try {
    const room = await Room.findByIdAndDelete(id);
    // room is not found
    if (!room)
      return res
        .status(404)
        .json({ message: "There is no room with this id." });

    // delete messages depend on the room
    const messages = await Message.find({ room_id: id });
    for (let i = 0; i < messages.length; i++) {
      await Message.findByIdAndDelete(messages[i]._id);
    }

    return res.status(202).json({ ...room._doc });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
