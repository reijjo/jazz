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
exports.createUser = exports.getAllUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = require("../models/userModel");
const validateInput_1 = __importDefault(require("../utils/validateInput"));
// users
// GET
// Get all users from database
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.UserModel.find({})
            .select("-passwd")
            .select("-verifycode");
        res.status(200).json(users);
    }
    catch (error) {
        console.log("Error fetching all users", error);
        res
            .status(500)
            .send({ message: "Server error fetching all users.", info: "error" });
    }
});
exports.getAllUsers = getAllUsers;
// users
// POST
// Create new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, passwd, passwd2 } = req.body;
    // If empty field
    if (!username || !email || !passwd || !passwd2) {
        return res
            .status(400)
            .json({ message: "No empty fields, thanks.", info: "error" });
    }
    // Validate inputs
    const validUsernameNot = validateInput_1.default.usernameCheck(username);
    const validEmailNot = validateInput_1.default.emailCheck(email);
    const validPasswdNot = validateInput_1.default.passwdCheck(passwd);
    const passwdMatchNot = validateInput_1.default.passwd2Check(passwd, passwd2);
    if (validUsernameNot) {
        return res
            .status(400)
            .json({ message: validUsernameNot.message, info: validUsernameNot.info });
    }
    else if (validEmailNot) {
        return res
            .status(400)
            .json({ message: validEmailNot.message, info: validEmailNot.info });
    }
    else if (validPasswdNot) {
        return res
            .status(400)
            .json({ message: validPasswdNot.message, info: validPasswdNot.info });
    }
    else if (passwdMatchNot) {
        return res
            .status(400)
            .json({ message: passwdMatchNot.message, info: passwdMatchNot.info });
    }
    // Check if username or email already exists
    try {
        const existingUsername = yield userModel_1.UserModel.findOne({ username: username });
        const existingEmail = yield userModel_1.UserModel.findOne({ email: email });
        if (existingUsername) {
            return res
                .status(400)
                .json({ message: "Username already exists!", info: "warning" });
        }
        else if (existingEmail) {
            return res
                .status(400)
                .json({ message: "Email already exists!", info: "warning" });
        }
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Error checking duplicates", error });
    }
    // Hash the user password
    const saltRounds = 10;
    const hashPasswd = yield bcryptjs_1.default.hash(passwd, saltRounds);
    // Make verifycode for forget password
    const verifycode = Buffer.from(hashPasswd).toString("base64");
    console.log("verifycode", verifycode);
    // Save user to database
    try {
        const newUser = new userModel_1.UserModel({
            username,
            email,
            passwd: hashPasswd,
            verifycode,
        });
        const savedUser = yield newUser.save();
        return res.status(201).json({
            message: `You can now login with '${savedUser.username}' or '${savedUser.email}'`,
            info: "success",
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Error creating user.", info: "error" });
    }
});
exports.createUser = createUser;
// users/:id
// GET
// Get user by ID
// export const getUser = async (req: Request, res: Response) => {
//   try {
//     const user = await UserModel.findById(req.user.id)
//       .select("-passwd")
//       .select("-verifycode");
//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "User not found.", info: "error" });
//     }
//     return res
//       .status(200)
//       .json({ user, message: `Hello ${user.username}.`, info: "success" });
//   } catch (error: unknown) {
//     return res
//       .status(500)
//       .send({ message: "My bad! Server error.", info: "error" });
//   }
// };
