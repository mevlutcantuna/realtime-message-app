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
      console.log(process.env.NODE_ENV);
    });
  })
  .catch((err) => console.log(err));

const uri = process.env.NODE_ENV
  ? "http://localhost:3000"
  : "https://message-app-realtime-mct.netlify.app/";

const io = new Server(server, {
  cors: {
    origin: uri,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // when connect
  console.log("User is connected with this ID : " + socket.id);

  // create and get room
  socket.on(
    "create-room",
    ({ room_id, name, user_id, created_date, updated_date }) => {
      io.emit("get-created-room", {
        _id: room_id,
        name,
        user_id,
        created_date,
        updated_date,
      });
    }
  );

  // delete room
  socket.on(
    "delete-room",
    ({ room_id, name, user_id, created_date, updated_date }) => {
      io.emit("get-delete-room", {
        _id: room_id,
        name,
        user_id,
        created_date,
        updated_date,
      });
    }
  );

  // send message
  socket.on("send-message", ({ content, room_id, created_date, user, _id }) => {
    io.emit("get-sent-message", {
      content,
      room_id,
      created_date,
      user,
      _id,
    });
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("User is disconnected with this ID : " + socket.id);
  });
});
