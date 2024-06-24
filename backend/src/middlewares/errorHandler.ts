import { NextFunction, Request, Response } from "express";
import AppError from "../utils/customError";

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status;
  return res.status(status).json({
    error: err.message,
    stack: process.env.NODE_ENV === "DEV" ? err.stack : null,
  });
};
