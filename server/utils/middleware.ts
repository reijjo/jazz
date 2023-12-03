import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "./config";
import { Token } from "./types";
// import { UserModel } from "../models/userModel";

// Need extended req for the user
declare global {
  namespace Express {
    interface Request {
      user: Token;
    }
  }
}

export type AuthRequest = Request & {
  user: Token;
};

// Verify the user token for protected routes
export const verifyJWT = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      console.log("!AUTHHEADER");

      return res
        .status(404)
        .json({ message: "No token found.", info: "error" });
    }

    const token = authHeader.split(" ")[1];

    console.log("token", token);

    if (token === null) {
      console.log("!token");

      return res
        .status(404)
        .json({ message: "Token malformed.", info: "error" });
    }

    const decoded = jwt.verify(String(token), String(config.SECRET)) as Token;

    if (!decoded) {
      console.log("EI DECODED");
    }

    console.log("decoded jalkeen");

    req.user = decoded;

    console.log("req.user jalkeen ennen next");

    next();

    console.log("next jalkeen ennen res.status");

    return res.status(200);
  } catch (error: unknown) {
    console.log("error", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: "Invalid token!", info: "error" });
    }
    return res
      .status(400)
      .json({ message: "Something shady with the token", info: "error" });
  }
};

// Error handler
export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === "JsonWebTokenError") {
    return res.status(404).json({ message: "Token malformed.", info: "error" });
  } else {
    return res.status(500).json({ message: "Server error", info: "error" });
  }
  next(error);
};
