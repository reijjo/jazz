import dotenv from "dotenv";
import morgan from "morgan";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute";
import { connectMongo } from "./utils/helpers";
import authRouter from "./routes/authRoute";
// import { errorHandler } from "./utils/middleware";

dotenv.config();

const app = express();

connectMongo();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/ping", (_req: Request, res: Response) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/users", userRouter);
app.use("/auth", authRouter);

// app.use(errorHandler);

export { app };
