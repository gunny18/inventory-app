import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/entities/user";
import { RegisteruserBody } from "../types";
import { AppDataSource } from "../models";
import wrapAsync from "../utils/asyncWrapper";
import AppError from "../utils/customError";

export const registerUser = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email, photo, bio, phone } =
      req.body as RegisteruserBody;
    if (!username || !password || !email) {
      throw new AppError("Missing Details", 400);
    }
    const userRepository = AppDataSource.getRepository(User);
    // check for already existing user
    const existingUser = await userRepository.findOne({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new AppError("User with email already exists!!", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User();
    user.name = username;
    user.passsword = hashedPassword;
    user.email = email;
    if (photo) user.photo = photo;
    if (bio) user.bio = bio;
    if (phone) user.phone = phone;
    const savedUser = await userRepository.save(user);
    if (!savedUser) {
      throw new AppError("Could not save user!!", 400);
    }
    return res.status(201);
  }
);
