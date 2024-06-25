import express from "express";
import {
  forgotPassword,
  getCurrentUser,
  loginStatus,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/user";
import { verifyAuthToken } from "../middlewares/auth";

const router = express.Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/logout", logoutUser)
  .get("/loginStatus", loginStatus)
  .get("/getUser", verifyAuthToken, getCurrentUser)
  .patch("/updateUser", verifyAuthToken, updateUser)
  .post("/forgotPassword", forgotPassword);
export default router;
