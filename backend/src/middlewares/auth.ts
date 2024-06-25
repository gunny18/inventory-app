import { NextFunction, Request } from "express";
import wrapAsync from "../utils/asyncWrapper";
import AppError from "../utils/customError";
import jwt from "jsonwebtoken";
import config from "../config ";
import { CustomJwtPayload, CustomRequest } from "../types";
import { AppDataSource } from "../models";
import User from "../models/entities/user";

export const verifyAuthToken = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new AppError("Unauthorized!", 401);
    const token = authHeader.split(" ")[1];
    if (!token) throw new AppError("Unauthorized!!", 401);
    const decoded = jwt.verify(token, config.secret) as CustomJwtPayload;
    const userId = decoded.data;
    const userRepository = AppDataSource.getRepository(User);
    const authUser = await userRepository.findOne({ where: { id: userId } });
    if (!authUser) throw new AppError("User not found!", 401);
    (req as CustomRequest).user = {
      id: authUser.id,
      username: authUser.name,
      email: authUser.email,
    };
    next();
  }
);
