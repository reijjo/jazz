import express from "express";
import { getAllPoints, addPoints } from "../controllers/pointsController";

const pointsRouter = express.Router();

pointsRouter.get("/", getAllPoints);
pointsRouter.post("/", addPoints);

export default pointsRouter;
