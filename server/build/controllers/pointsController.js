"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPoints = exports.getAllPoints = void 0;
const pointsModel_1 = require("../models/pointsModel");
// points
// GET
// Get all points
const getAllPoints = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const points = yield pointsModel_1.PointsModel.find({});
        res.status(200).json(points);
    }
    catch (error) {
        console.log("Error fetching all points", error);
        res
            .status(500)
            .send({ message: "Server error fetching points", info: "error" });
    }
});
exports.getAllPoints = getAllPoints;
// points
// POST
// Add points
const addPoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { points } = req.body;
    console.log("points", points);
    console.log("reqbody", req.body);
    try {
        const newPoints = new pointsModel_1.PointsModel({
            points,
        });
        console.log("newPoints", newPoints);
        yield newPoints.save();
        return res.status(201).json({
            message: "points saved",
            info: "success",
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Error adding points", info: "error" });
    }
});
exports.addPoints = addPoints;
