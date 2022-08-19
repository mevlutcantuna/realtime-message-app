import Room from "../model/room.js";

export const getRoom = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    return res.status(200).json({ id });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getAllRooms = (req, res, next) => {
  try {
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRoom = async (req, res, next) => {
  const { name, user_id } = req.body;
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
    const newRoom = new Room({ name, user_id });
    return res.status(201).json({ newRoom });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteRoom = (req, res, next) => {
  try {
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
