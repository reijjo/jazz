"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const pointsSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        default: "Testiukko",
    },
    points: Number,
}, {
    timestamps: true,
});
pointsSchema.set("toJSON", {
    transform: (_document, returnedPoints) => {
        returnedPoints.id = returnedPoints._id.toString();
        delete returnedPoints._id;
        delete returnedPoints.__v;
    },
});
const PointsModel = mongoose_1.default.model("Points", pointsSchema);
exports.PointsModel = PointsModel;
