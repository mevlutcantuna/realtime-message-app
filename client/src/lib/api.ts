import axios from "axios";

const uri = process.env.development
  ? "http://localhost:8080/"
  : "https://realtime-message-app.herokuapp.com/";

export const api = axios.create({
  baseURL: uri,
});
