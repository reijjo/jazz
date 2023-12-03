import express from "express";
import { login, authorization } from "../controllers/authController";
import { verifyJWT } from "../utils/middleware";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/orization", verifyJWT, authorization);

export default authRouter;
