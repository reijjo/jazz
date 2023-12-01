import supertest from "supertest";
// import mongoose from "mongoose";
// import { config } from "../utils/config";
import { app } from "../app";
import mongoose from "mongoose";

const api = supertest(app);

test("pingpongshow", async () => {
  await api.get("/ping").expect(200);
});

test("users", async () => {
  const users = await api.get("/users").expect(200);

  console.log("users", users.body);
});

afterAll(async () => {
  await mongoose.connection.close();
});
