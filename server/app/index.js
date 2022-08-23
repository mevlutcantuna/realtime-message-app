import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import roomRouter from "./router/room.js";
import messageRouter from "./router/message.js";

const app = express();
const port = process.env.PORT || 8080;
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
    app.listen(port, () => {
      console.log("DB Connection Successfully");
    });
  })
  .catch((err) => console.log(err));
