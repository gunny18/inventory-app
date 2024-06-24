import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user";

const router = express.Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/logout", logoutUser);

export default router;
