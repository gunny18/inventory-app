import { NextFunction, Request, Response } from "express";
import AppError from "../utils/customError";
import config from "../config ";

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status;
  return res.status(status).json({
    error: err.message,
    stack: config.env === "DEV" ? err.stack : null,
  });
};
