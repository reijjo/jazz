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
      passwd: "Salasana123!",
      passwd2: "Salasana123!",
    };

    const res = await api.post("/users").send(newbie).expect(201);
    expect(res.body.message).toContain(`${newbie.username}`);

    const allUsers = await usersInDb();
    expect(allUsers).toHaveLength(initialUsers.length + 1);
  });

  // Empty field
  test("Empty field adding user", async () => {
    const newbie = {
      username: "repe",
      passwd: "salasana",
      passwd2: "extrakoodi",
    };

    const res = await api.post("/users").send(newbie).expect(400);
    expect(res.body.message).toContain("No empty fields");

    const allUsers = await usersInDb();
    expect(allUsers).toHaveLength(initialUsers.length);
  });

  // Duplicate username
  test("Add user with existing username", async () => {
    const newbie = {
      username: "repe",
      email: "callme@extraguy.com",
      passwd: "Salasana123!",
      passwd2: "Salasana123!",
    };

    const res = await api.post("/users").send(newbie).expect(400);
    expect(res.body.message).toContain("already exists");

    const allUsers = await usersInDb();
    expect(allUsers).toHaveLength(initialUsers.length);
  });

  // Duplicate email
  test("Add user with existing email", async () => {
    const newbie = {
      username: "callmeextraguy",
      email: "liisa@wow.com",
      passwd: "Salasana123!",
      passwd2: "Salasana123!",
    };

    const res = await api.post("/users").send(newbie).expect(400);
    expect(res.body.message).toContain("already exists");

    const allUsers = await usersInDb();
    expect(allUsers).toHaveLength(initialUsers.length);
  });
});

describe("Create user with shitty inputs", () => {
  test("Too $hort username", async () => {
    const newbie = {
      username: "re",
      email: "repe@wow.com",
      passwd: "salasana",
      passwd2: "extrakoodi",
    };

    const res = await api.post("/users").send(newbie).expect(400);
    expect(res.body.message).toContain("3 - 20");

    const allUsers = await usersInDb();
    expect(allUsers).toHaveLength(initialUsers.length);
  });

  test("Special char username", async () => {
    const newbie = {
      username: "repe$",
      email: "repe@wow.com",
      passwd: "salasana",
      passwd2: "extrakoodi",
    };

    const res = await api.post("/users").send(newbie).expect(400);
    expect(res.body.message).toContain("Only letters");

    const allUsers = await usersInDb();
    expect(allUsers).toHaveLength(initialUsers.length);
  });

  test("Invalid email", async () => {
    const newbie = {
      username: "repe",
      email: "repe@wowcom",
      passwd: "salasana",
      passwd2: "extrakoodi",
    };

    const res = await api.post("/users").send(newbie).expect(400);
    expect(res.body.message).toContain("Shady");

    const allUsers = await usersInDb();
    expect(allUsers).toHaveLength(initialUsers.length);
  });

  test("Password length", async () => {
    const newbie = {
      username: "repe",
      email: "repe@wow.com",
      passwd: "salasanasalasanasalasanasalasanasalasana",
      passwd2: "extrakoodi",
    };

    const res = await api.post("/users").send(newbie).expect(400);
    expect(res.body.message).toContain("8 - 30");

    const allUsers = await usersInDb();
    expect(allUsers).toHaveLength(initialUsers.length);
  });

  test("No UPPERCASE in password", async () => {
    const newbie = {
      username: "repe",
      email: "repe@wow.com",
      passwd: "sala_123",
      passwd2: "extrakoodi",
    };

    const res = await api.post("/users").send(newbie).expect(400);
    expect(res.body.message).toContain("Uppercase");

    const allUsers = await usersInDb();
    expect(allUsers).toHaveLength(initialUsers.length);
  });

  test("Password !== Confirm Password", async () => {
    const newbie = {
      username: "repe",
      email: "repe@wow.com",
      passwd: "Sala_123",
      passwd2: "Sala_124",
    };

    const res = await api.post("/users").send(newbie).expect(400);
    expect(res.body.message).toContain("do not match");

    const allUsers = await usersInDb();
    expect(allUsers).toHaveLength(initialUsers.length);
  });
});

// Closes database connection
afterAll(async () => {
  await mongoose.connection.close();
});
