import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

// Request body types
export type RegisterUserBody = {
  username: string;
  password: string;
  email: string;
  photo: string | null;
  bio: string | null;
  phone: string | null;
};

// Request user auth
export type AuthUser = {
  id: string;
  username: string;
  email: string;
};

// Request body login
export type LoginUserBody = {
  email: string;
  password: string;
};

// JWT decoded type
export interface CustomJwtPayload extends JwtPayload {
  data: string;
}

// custom request with user
export interface CustomRequest extends Request {
  user: AuthUser;
}
