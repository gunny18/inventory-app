import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { initDatabase } from "./models";
import cookieParser from "cookie-parser";
import corsConfig from "./utils/cors";
import cors from "cors";

const PORT = process.env.PORT || 3005;

const app = express();

// init DB
initDatabase();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));

// routes

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
