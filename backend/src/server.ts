import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { initDatabase } from "../models";

const PORT = process.env.PORT || 3005;

initDatabase();

const app = express();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
