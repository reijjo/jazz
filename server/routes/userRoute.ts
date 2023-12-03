import express from "express";

import {
  createUser,
  getAllUsers,
  // getUser,
} from "../controllers/userController";
// import { verifyJWT } from "../utils/middleware";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
// userRouter.get("/", verifyJWT, getAllUsers);
userRouter.post("/", createUser);
// userRouter.get("/:id", getUser);

export default userRouter;
