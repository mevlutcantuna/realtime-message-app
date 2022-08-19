import Room from "../model/room.js";

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
    const allRooms = await Room.find({});
    return res.status(200).json(allRooms);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createRoom = async (req, res, next) => {
  const { name, user_id } = req.body;
  try {
    // name must not be empty
    name === "" && res.status(400).json({ message: "Please provide name" });

    // if there is room with same name
    const exists = await Room.findOne({ name });
    console.log(exists);
    if (exists) {
      return res.status(400).json({
        message: "There is room with same name, please type another room name",
      });
    }

    // create and save new room
    const newRoom = new Room({ name, user_id });
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

    return res.status(202).json({ ...room._doc });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
