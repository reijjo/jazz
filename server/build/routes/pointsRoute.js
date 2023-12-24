"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pointsController_1 = require("../controllers/pointsController");
const pointsRouter = express_1.default.Router();
pointsRouter.get("/", pointsController_1.getAllPoints);
pointsRouter.post("/", pointsController_1.addPoints);
exports.default = pointsRouter;
