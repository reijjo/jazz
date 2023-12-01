import mongoose from "mongoose";
import chalk from "chalk";
import { app } from "./app";
import { Request, Response } from "express";
import { config } from "./utils/config";

app.get("/ping", (_req: Request, res: Response) => {
  console.log("someone pinged here");
  res.send("pong");
});

// Server & MongoDB connections
app.listen(config.PORT, async () => {
  try {
    console.log(chalk.blueBright("..."));

    await mongoose.connect(String(config.MONGO_URI));

    console.log(chalk.cyanBright(`Server running on port ${config.PORT}`));
    console.log(chalk.cyan("Connected to MongoDB."));
    console.log(chalk.yellowBright("Environment", process.env.NODE_ENV));
  } catch (error: unknown) {
    console.log("mongoose connect err", error);
  }
});
