import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import roomRouter from "./router/room.js";
import messageRouter from "./router/message.js";
import { Server } from "socket.io";
import http from "http";

const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Chat App API");
});

app.use(roomRouter);
app.use(messageRouter);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(port, () => {
      console.log("DB Connection Successfully " + port);
    });
  })
  .catch((err) => console.log(err));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected on " + socket.id);
});
