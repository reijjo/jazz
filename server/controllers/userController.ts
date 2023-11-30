import { Request, Response } from "express";
import { UserModel } from "../models/userModel";

// users
// GET
// Get all users from database
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find({});
    res.status(200).send(users);
  } catch (error: unknown) {
    console.log("Error fetching all users", error);
    res.status(500).send({ message: "Server error fetching all users." });
  }
};
