import express from "express";
import {
  getCurrentUser,
  loginStatus,
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
  .get("/loginStatus", loginStatus)
  .get("/getUser", verifyAuthToken, getCurrentUser);
export default router;
