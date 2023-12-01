import { UserModel } from "../models/userModel";

// Users in database
export const initialUsers = [
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
export const usersInDb = async () => {
  const users = await UserModel.find({});
  return users.map((user) => user.toJSON());
};
