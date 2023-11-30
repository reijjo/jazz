import dotenv from "dotenv";
import { Config } from "./types";

dotenv.config();

const PORT = Number(process.env.PORT);

const MONGO_URI = process.env.MONGO_URI;

export const config: Config = {
  PORT,
  MONGO_URI,
};
