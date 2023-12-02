import express from "express";

import { createUser, getAllUsers } from "../controllers/userController";
import { verifyJWT } from "../utils/middleware";

const userRouter = express.Router();

userRouter.get("/", verifyJWT, getAllUsers);
userRouter.post("/", createUser);

export default userRouter;
