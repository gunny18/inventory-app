import express from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user";
import { verifyAuthToken } from "../middlewares/auth";

const router = express.Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/logout", logoutUser)
  .get("getUser", verifyAuthToken, getCurrentUser);
export default router;
