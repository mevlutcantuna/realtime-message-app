import express from "express";
import {
  getAllRooms,
  getRoom,
  deleteRoom,
  createRoom,
} from "../controller/room.js";

const router = express.Router();

router.post("/room", createRoom);
router.get("/all-rooms", getAllRooms);
router.get("/room/:id", getRoom);
router.delete("/room/:id", deleteRoom);

export default router;
