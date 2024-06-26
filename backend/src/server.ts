import express from "express";
import { initDatabase } from "./models";
import cookieParser from "cookie-parser";
import corsConfig from "./utils/cors";
import cors from "cors";
import userRouter from "./routes/user";
import { errorHandler } from "./middlewares/errorHandler";
import config from "./config ";

const PORT = config.port || 3005;

const app = express();

// init DB
initDatabase();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));

// routes
app.use("/api/users", userRouter);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
