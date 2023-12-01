import mongoose from "mongoose";
import supertest from "supertest";
import { app } from "../app";

const api = supertest(app);

test("users are returned as json", async () => {
  console.log("IM IN!");
  await api.get("/ping").timeout(12000);

  // console.log("res", res);

  expect(200);
});

afterAll(async () => {
  await mongoose.connection.close();
});
