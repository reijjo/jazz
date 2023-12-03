import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { LoginInfo, User } from "../utils/types";
import { UserModel } from "../models/userModel";
import { config } from "../utils/config";
import { AuthRequest } from "../utils/middleware";

// auth/login
// POST
// Login user
export const login = async (req: Request, res: Response) => {
  const { user, passwd } = req.body as LoginInfo;

  // If empty field
  if (!user || !passwd) {
    return res
      .status(400)
      .json({ message: "No empty fields thanks.", info: "error" });
  }

  // Check if user login is a username / password
  let loginUser: User | null;
  try {
    if (user.includes("@")) {
      loginUser = await UserModel.findOne({ email: user });
    } else {
      loginUser = await UserModel.findOne({ username: user });
    }
  } catch (error: unknown) {
    return res.status(500).json({ message: "Error finding user", error });
  }

  // If user doesn't exist
  if (!loginUser) {
    return res.status(400).json({ message: "User not found!", info: "error" });
  }

  // Password ok?
  const okPasswd = await bcryptjs.compare(passwd, loginUser.passwd);
  if (!okPasswd) {
    return res
      .status(400)
      .json({ message: "Invalid User / Password.", info: "error" });
  }

  // Create token
  const userToken = {
    id: loginUser.id,
    username: loginUser.username,
    email: loginUser.email,
  };
  const token = jwt.sign(userToken, String(config.SECRET), {
    expiresIn: 60 * 60,
  });

  console.log("user passwd", user, passwd);
  console.log("found user", loginUser);
  console.log("token", userToken);

  return res
    .status(200)
    .json({ token, loginUser, message: `Logged in!`, info: "success" });
};

// auth/orization
// GET
// Verify token once again
export const authorization = async (req: AuthRequest, res: Response) => {
  console.log("req.user", req.user);

  try {
    console.log("eka");
    const user = await UserModel.findById(req.user.id)
      .select("-passwd")
      .select("-verifycode");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", info: "error" });
    }

    return res
      .status(200)
      .json({ user, message: `Hello ${user.username}.`, info: "success" });
  } catch (error: unknown) {
    return res
      .status(500)
      .send({ message: "My bad! Server error.", info: "error" });
  }
};
