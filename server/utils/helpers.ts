import mongoose from "mongoose";
import chalk from "chalk";
import { config } from "./config";

export const connectMongo = async () => {
  try {
    if (process.env.NODE_ENV !== "test") {
      console.log(chalk.magentaBright("..."));
    }

    await mongoose.connect(String(config.MONGO_URI));

    if (process.env.NODE_ENV !== "test") {
      console.log(chalk.magentaBright("Connected to MongoDB."));
    }
    console.log(chalk.yellowBright("Environment", process.env.NODE_ENV));
  } catch (error: unknown) {
    console.log("mongoose connect err", error);
  }
};
