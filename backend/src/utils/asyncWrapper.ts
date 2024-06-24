import { NextFunction, Request, Response } from "express";
import AppError from "./customError";

const wrapAsync = (func: Function) => {
  return (req: Request, res: Response, next: NextFunction) =>
    func(req, res, next).catch((e: AppError) => next(e));
};

export default wrapAsync;
