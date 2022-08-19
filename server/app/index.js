import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import roomRouter from "./router/room.js";

const app = express();
const port = process.env.PORT || 8080;
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Chat App API");
});

app.use(roomRouter);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Working on ${process.env.PORT} PORT...`);
    });
  })
  .catch((err) => console.log(err));
