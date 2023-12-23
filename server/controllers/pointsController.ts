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
  const { points } = req.body;

  console.log("points", points);
  console.log("reqbody", req.body);

  try {
    const newPoints = new PointsModel({
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
