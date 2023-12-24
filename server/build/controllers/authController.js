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
exports.authorization = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const config_1 = require("../utils/config");
// auth/login
// POST
// Login user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, passwd } = req.body;
    // If empty field
    if (!user || !passwd) {
        return res
            .status(400)
            .json({ message: "No empty fields thanks.", info: "error" });
    }
    // Check if user login is a username / password
    let loginUser;
    try {
        if (user.includes("@")) {
            loginUser = yield userModel_1.UserModel.findOne({ email: user });
        }
        else {
            loginUser = yield userModel_1.UserModel.findOne({ username: user });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Error finding user", error });
    }
    // If user doesn't exist
    if (!loginUser) {
        return res.status(400).json({ message: "User not found!", info: "error" });
    }
    // Password ok?
    const okPasswd = yield bcryptjs_1.default.compare(passwd, loginUser.passwd);
    if (!okPasswd) {
        return res
            .status(400)
            .json({ message: "Invalid User / Password.", info: "error" });
    }
    // Create token
    const userToken = {
        id: loginUser.id,
        username: loginUser.username,
        email: loginUser.email,
    };
    const token = jsonwebtoken_1.default.sign(userToken, String(config_1.config.SECRET), {
        expiresIn: 60 * 60,
    });
    console.log("user passwd", user, passwd);
    console.log("found user", loginUser);
    console.log("token", userToken);
    return res
        .status(200)
        .json({ token, loginUser, message: `Logged in!`, info: "success" });
});
exports.login = login;
// auth/orization
// GET
// Verify token once again
const authorization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "Valid token!", user: req.user });
});
exports.authorization = authorization;
