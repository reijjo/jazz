import { Request, Response } from "express";
import { PointsModel } from "../models/pointsModel";

// points
// GET
// Get all points
export const getAllPoints = async (_req: Request, res: Response) => {
  try {
    const points = await PointsModel.find({});
    res.status(200).json(points);
  } catch (error: unknown) {
    console.log("Error fetching all points", error);
    res
      .status(500)
      .send({ message: "Server error fetching points", info: "error" });
  }
};

// points
// POST
// Add points
export const addPoints = async (req: Request, res: Response) => {
  const { username, points } = req.body;

  console.log("username", username);
  console.log("points", points);
  console.log("reqbody", req.body);

  if (!points) {
    return res.status(400).json({ message: "Points missing?", info: "error" });
  }

  try {
    const newPoints = new PointsModel({
      username,
      points,
    });

    console.log("newPoints", newPoints);

    await newPoints.save();

    return res.status(201).json({
      message: "points saved",
      info: "success",
    });
  } catch (error: unknown) {
    return res
      .status(500)
      .json({ message: "Error adding points", info: "error" });
  }
};
