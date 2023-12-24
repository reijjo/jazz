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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("../app");
const userModel_1 = require("../models/userModel");
const test_helper_1 = require("./test_helper");
const api = (0, supertest_1.default)(app_1.app);
describe("Basic user tests", () => {
    // Clears the database and inserts test users
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel_1.UserModel.deleteMany({});
        yield userModel_1.UserModel.insertMany(test_helper_1.initialUsers);
    }));
    // Get users and compare to initialUsers
    test("Get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield api
            .get("/users")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        const users2 = yield (0, test_helper_1.usersInDb)();
        expect(users.body).toHaveLength(users2.length);
        expect(users.body).not.toHaveLength(users2.length + 1);
    }));
    // Confirm initial users
    test("Testing test users", () => __awaiter(void 0, void 0, void 0, function* () {
        const eka = test_helper_1.initialUsers[0];
        const toka = test_helper_1.initialUsers[1];
        expect(eka.username).toBe("repe");
        expect(toka.email).toContain("liisa");
        const verifycontents = test_helper_1.initialUsers.map((v) => v.verifycode);
        expect(verifycontents).toContain("liisakoode");
    }));
    // Add new user
    test("Legit user to db", () => __awaiter(void 0, void 0, void 0, function* () {
        const newbie = {
            username: "extraguy",
            email: "callme@extraguy.com",
            passwd: "Salasana123!",
            passwd2: "Salasana123!",
        };
        const res = yield api.post("/users").send(newbie).expect(201);
        expect(res.body.message).toContain(`${newbie.username}`);
        const allUsers = yield (0, test_helper_1.usersInDb)();
        expect(allUsers).toHaveLength(test_helper_1.initialUsers.length + 1);
    }));
    // Empty field
    test("Empty field adding user", () => __awaiter(void 0, void 0, void 0, function* () {
        const newbie = {
            username: "repe",
            passwd: "salasana",
            passwd2: "extrakoodi",
        };
        const res = yield api.post("/users").send(newbie).expect(400);
        expect(res.body.message).toContain("No empty fields");
        const allUsers = yield (0, test_helper_1.usersInDb)();
        expect(allUsers).toHaveLength(test_helper_1.initialUsers.length);
    }));
    // Duplicate username
    test("Add user with existing username", () => __awaiter(void 0, void 0, void 0, function* () {
        const newbie = {
            username: "repe",
            email: "callme@extraguy.com",
            passwd: "Salasana123!",
            passwd2: "Salasana123!",
        };
        const res = yield api.post("/users").send(newbie).expect(400);
        expect(res.body.message).toContain("already exists");
        const allUsers = yield (0, test_helper_1.usersInDb)();
        expect(allUsers).toHaveLength(test_helper_1.initialUsers.length);
    }));
    // Duplicate email
    test("Add user with existing email", () => __awaiter(void 0, void 0, void 0, function* () {
        const newbie = {
            username: "callmeextraguy",
            email: "liisa@wow.com",
            passwd: "Salasana123!",
            passwd2: "Salasana123!",
        };
        const res = yield api.post("/users").send(newbie).expect(400);
        expect(res.body.message).toContain("already exists");
        const allUsers = yield (0, test_helper_1.usersInDb)();
        expect(allUsers).toHaveLength(test_helper_1.initialUsers.length);
    }));
});
describe("Create user with shitty inputs", () => {
    test("Too $hort username", () => __awaiter(void 0, void 0, void 0, function* () {
        const newbie = {
            username: "re",
            email: "repe@wow.com",
            passwd: "salasana",
            passwd2: "extrakoodi",
        };
        const res = yield api.post("/users").send(newbie).expect(400);
        expect(res.body.message).toContain("3 - 20");
        const allUsers = yield (0, test_helper_1.usersInDb)();
        expect(allUsers).toHaveLength(test_helper_1.initialUsers.length);
    }));
    test("Special char username", () => __awaiter(void 0, void 0, void 0, function* () {
        const newbie = {
            username: "repe$",
            email: "repe@wow.com",
            passwd: "salasana",
            passwd2: "extrakoodi",
        };
        const res = yield api.post("/users").send(newbie).expect(400);
        expect(res.body.message).toContain("Only letters");
        const allUsers = yield (0, test_helper_1.usersInDb)();
        expect(allUsers).toHaveLength(test_helper_1.initialUsers.length);
    }));
    test("Invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
        const newbie = {
            username: "repe",
            email: "repe@wowcom",
            passwd: "salasana",
            passwd2: "extrakoodi",
        };
        const res = yield api.post("/users").send(newbie).expect(400);
        expect(res.body.message).toContain("Shady");
        const allUsers = yield (0, test_helper_1.usersInDb)();
        expect(allUsers).toHaveLength(test_helper_1.initialUsers.length);
    }));
    test("Password length", () => __awaiter(void 0, void 0, void 0, function* () {
        const newbie = {
            username: "repe",
            email: "repe@wow.com",
            passwd: "salasanasalasanasalasanasalasanasalasana",
            passwd2: "extrakoodi",
        };
        const res = yield api.post("/users").send(newbie).expect(400);
        expect(res.body.message).toContain("8 - 30");
        const allUsers = yield (0, test_helper_1.usersInDb)();
        expect(allUsers).toHaveLength(test_helper_1.initialUsers.length);
    }));
    test("No UPPERCASE in password", () => __awaiter(void 0, void 0, void 0, function* () {
        const newbie = {
            username: "repe",
            email: "repe@wow.com",
            passwd: "sala_123",
            passwd2: "extrakoodi",
        };
        const res = yield api.post("/users").send(newbie).expect(400);
        expect(res.body.message).toContain("Uppercase");
        const allUsers = yield (0, test_helper_1.usersInDb)();
        expect(allUsers).toHaveLength(test_helper_1.initialUsers.length);
    }));
    test("Password !== Confirm Password", () => __awaiter(void 0, void 0, void 0, function* () {
        const newbie = {
            username: "repe",
            email: "repe@wow.com",
            passwd: "Sala_123",
            passwd2: "Sala_124",
        };
        const res = yield api.post("/users").send(newbie).expect(400);
        expect(res.body.message).toContain("do not match");
        const allUsers = yield (0, test_helper_1.usersInDb)();
        expect(allUsers).toHaveLength(test_helper_1.initialUsers.length);
    }));
});
// Closes database connection
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
