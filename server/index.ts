import mongoose from "mongoose";
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
    console.log("...");

    await mongoose.connect(String(config.MONGO_URI));

    console.log(`Server running on port ${config.PORT}`);
    console.log("Connected to MongoDB.");
  } catch (error: unknown) {
    console.log("mongoose connect err", error);
  }
});
