import express from "express";
import { getRoomMessages, sendMessage } from "../controller/message.js";

const router = express.Router();

router.post("/send-message", sendMessage);
router.get("/room-messages/:id", getRoomMessages);

export default router;
