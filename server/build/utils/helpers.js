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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chalk_1 = __importDefault(require("chalk"));
const config_1 = require("./config");
const connectMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.NODE_ENV !== "test") {
            console.log(chalk_1.default.magentaBright("..."));
        }
        yield mongoose_1.default.connect(String(config_1.config.MONGO_URI));
        if (process.env.NODE_ENV !== "test") {
            console.log(chalk_1.default.magentaBright("Connected to MongoDB."));
        }
        console.log(chalk_1.default.yellowBright("Environment", process.env.NODE_ENV));
    }
    catch (error) {
        console.log("mongoose connect err", error);
    }
});
exports.connectMongo = connectMongo;
