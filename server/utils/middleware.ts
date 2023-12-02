import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "./config";
import { Token, User } from "./types";

// Need extended req for the user
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export type AuthRequest = Request & {
  user: User;
};

// Verify the user token for protected routes
export const verifyJWT = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(404).json({ message: "No token found.", info: "error" });
  }

  try {
    const decoded = jwt.verify(String(token), String(config.SECRET)) as Token;

    req.user = decoded.user;
    next();
    return;
  } catch (error: unknown) {
    return res.status(403).json({ message: "Invalid token!", info: "error" });
  }
};
