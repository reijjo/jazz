import dotenv from "dotenv";
import { Config } from "./types";

dotenv.config();

const PORT = Number(process.env.PORT);

const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;

const SECRET = String(process.env.SECRET);

export const config: Config = {
  PORT,
  MONGO_URI,
  SECRET,
};
