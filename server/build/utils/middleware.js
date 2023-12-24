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
exports.errorHandler = exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
// Verify the user token for protected routes
const verifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            console.log("!AUTHHEADER");
            return res
                .status(404)
                .json({ message: "No token found.", info: "error" });
        }
        const token = authHeader.split(" ")[1];
        console.log("token", token);
        if (token === null) {
            console.log("!token");
            return res
                .status(404)
                .json({ message: "Token malformed.", info: "error" });
        }
        const decoded = jsonwebtoken_1.default.verify(String(token), String(config_1.config.SECRET));
        if (!decoded) {
            console.log("EI DECODED");
        }
        console.log("decoded jalkeen");
        req.user = decoded;
        console.log("req.user jalkeen ennen next");
        next();
        console.log("next jalkeen ennen res.status");
        return res.status(200);
    }
    catch (error) {
        console.log("error", error);
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(403).json({ message: "Invalid token!", info: "error" });
        }
        return res
            .status(400)
            .json({ message: "Something shady with the token", info: "error" });
    }
});
exports.verifyJWT = verifyJWT;
// Error handler
const errorHandler = (error, _req, res, next) => {
    if (error.name === "JsonWebTokenError") {
        return res.status(404).json({ message: "Token malformed.", info: "error" });
    }
    else {
        return res.status(500).json({ message: "Server error", info: "error" });
    }
    next(error);
};
exports.errorHandler = errorHandler;
