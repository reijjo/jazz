import supertest from "supertest";
import mongoose from "mongoose";
import { app } from "../app";
import { UserModel } from "../models/userModel";
import { initialUsers, usersInDb } from "./test_helper";

const api = supertest(app);

describe("Basic user tests", () => {
  // Clears the database and inserts test users
  beforeEach(async () => {
    await UserModel.deleteMany({});
    await UserModel.insertMany(initialUsers);
  });

  // Get users and compare to initialUsers
  test("Get all users", async () => {
    const users = await api
      .get("/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const users2 = await usersInDb();
    expect(users.body).toHaveLength(users2.length);
    expect(users.body).not.toHaveLength(users2.length + 1);
  });

  // Confirm initial users
  test("Testing test users", async () => {
    const eka = initialUsers[0];
    const toka = initialUsers[1];

    expect(eka.username).toBe("repe");
    expect(toka.email).toContain("liisa");

    const verifycontents = initialUsers.map((v) => v.verifycode);
    expect(verifycontents).toContain("liisakoode");
  });

  // Add new user
  test("Legit user to db", async () => {
    const newbie = {
      username: "extraguy",
      email: "callme@extraguy.com",
      passwd: "salasana",
      passwd2: "extrakoodi",
    };

    const res = await api.post("/users").send(newbie).expect(201);
    console.log("res", res);
  });
});

// Closes database connection
afterAll(async () => {
  await mongoose.connection.close();
});
