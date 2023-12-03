import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { UserModel } from "../models/userModel";
import { RegisterInfo } from "../utils/types";
import isValid from "../utils/validateInput";

// users
// GET
// Get all users from database
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find({})
      .select("-passwd")
      .select("-verifycode");
    res.status(200).json(users);
  } catch (error: unknown) {
    console.log("Error fetching all users", error);
    res
      .status(500)
      .send({ message: "Server error fetching all users.", info: "error" });
  }
};

// users
// POST
// Create new user
export const createUser = async (req: Request, res: Response) => {
  const { username, email, passwd, passwd2 }: RegisterInfo = req.body;

  // If empty field
  if (!username || !email || !passwd || !passwd2) {
    return res
      .status(400)
      .json({ message: "No empty fields, thanks.", info: "error" });
  }

  // Validate inputs
  const validUsernameNot = isValid.usernameCheck(username);
  const validEmailNot = isValid.emailCheck(email);
  const validPasswdNot = isValid.passwdCheck(passwd);
  const passwdMatchNot = isValid.passwd2Check(passwd, passwd2);

  if (validUsernameNot) {
    return res
      .status(400)
      .json({ message: validUsernameNot.message, info: validUsernameNot.info });
  } else if (validEmailNot) {
    return res
      .status(400)
      .json({ message: validEmailNot.message, info: validEmailNot.info });
  } else if (validPasswdNot) {
    return res
      .status(400)
      .json({ message: validPasswdNot.message, info: validPasswdNot.info });
  } else if (passwdMatchNot) {
    return res
      .status(400)
      .json({ message: passwdMatchNot.message, info: passwdMatchNot.info });
  }

  // Check if username or email already exists
  try {
    const existingUsername = await UserModel.findOne({ username: username });
    const existingEmail = await UserModel.findOne({ email: email });

    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "Username already exists!", info: "warning" });
    } else if (existingEmail) {
      return res
        .status(400)
        .json({ message: "Email already exists!", info: "warning" });
    }
  } catch (error: unknown) {
    return res
      .status(500)
      .json({ message: "Error checking duplicates", error });
  }

  // Hash the user password
  const saltRounds = 10;
  const hashPasswd = await bcryptjs.hash(passwd, saltRounds);

  // Make verifycode for forget password
  const verifycode = Buffer.from(hashPasswd).toString("base64");

  console.log("verifycode", verifycode);

  // Save user to database
  try {
    const newUser = new UserModel({
      username,
      email,
      passwd: hashPasswd,
      verifycode,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: `You can now login with '${savedUser.username}' or '${savedUser.email}'`,
      info: "success",
    });
  } catch (error: unknown) {
    return res
      .status(500)
      .json({ message: "Error creating user.", info: "error" });
  }
};

// users/:id
// GET
// Get user by ID
// export const getUser = async (req: Request, res: Response) => {
//   try {
//     const user = await UserModel.findById(req.user.id)
//       .select("-passwd")
//       .select("-verifycode");
//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "User not found.", info: "error" });
//     }

//     return res
//       .status(200)
//       .json({ user, message: `Hello ${user.username}.`, info: "success" });
//   } catch (error: unknown) {
//     return res
//       .status(500)
//       .send({ message: "My bad! Server error.", info: "error" });
//   }
// };
