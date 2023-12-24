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
exports.usersInDb = exports.initialUsers = void 0;
const userModel_1 = require("../models/userModel");
// Users in database
exports.initialUsers = [
    {
        username: "repe",
        email: "repe@wow.com",
        passwd: "salasana",
        verifycode: "repekoodi",
    },
    {
        username: "liisa",
        email: "liisa@wow.com",
        passwd: "salasana",
        verifycode: "liisakoode",
    },
];
// Get all users in database
const usersInDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.UserModel.find({});
    return users.map((user) => user.toJSON());
});
exports.usersInDb = usersInDb;
