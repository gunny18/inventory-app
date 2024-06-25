import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/entities/user";
import {
  RegisterUserBody,
  LoginUserBody,
  CustomRequest,
  CustomJwtPayload,
} from "../types";
import { AppDataSource } from "../models";
import wrapAsync from "../utils/asyncWrapper";
import AppError from "../utils/customError";
import jwt from "jsonwebtoken";
import config from "../config ";

export const getAccessToken = (id: string) => {
  return jwt.sign({ data: id }, config.secret, { expiresIn: "1d" });
};

export const loginUser = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as LoginUserBody;
    if (!email || !password) {
      throw new AppError("Missing Email or Password", 400);
    }
    const userRepository = AppDataSource.getRepository(User);
    const foundUser = await userRepository.findOne({
      where: {
        email,
      },
    });
    if (!foundUser) {
      throw new AppError("No such user found", 400);
    }
    const isCorrect = await bcrypt.compare(password, foundUser.passsword);
    if (!isCorrect) {
      throw new AppError("Incorrect Password", 400);
    }
    // get token
    const token = getAccessToken(foundUser.id);
    // send http only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      photo: foundUser.photo,
      phone: foundUser.phone,
      bio: foundUser.bio,
      token,
    });
  }
);

export const logoutUser = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("token", {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({ message: "Logged out" });
  }
);

export const registerUser = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email, photo, bio, phone } =
      req.body as RegisterUserBody;
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
    // get token
    const token = getAccessToken(savedUser.id);
    // send http only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
    return res.status(201).json({
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      photo: savedUser.photo,
      phone: savedUser.phone,
      bio: savedUser.bio,
      token,
    });
  }
);

export const getCurrentUser = wrapAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError("Unauthorized!", 401);
    return res.status(200).json({ user: req.user });
  }
);

export const loginStatus = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) return res.json(false);
    const decoded = jwt.verify(token, config.secret) as CustomJwtPayload;
    if (!decoded) return res.json(false);
    res.json(true);
  }
);

export const updateUser = wrapAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { username, email, photo, phone, bio } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: req.user.id });
    if (!user) throw new AppError("User not found", 400);
    if (username) user.name = username;
    if (email) user.email = email;
    if (photo) user.photo = photo;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;
    const updatedUser = await userRepository.save(user);
    if (!updateUser) throw new AppError("Could not update user", 400);
    return res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
    });
  }
);
