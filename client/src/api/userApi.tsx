import axios from "axios";
import { RegisterInfo } from "../utils/types";

// Add a proxy to package.json and then use
// const baseUrl = '/users'
const baseUrl = "http://localhost:3001/users";

const getAllUsers = async () => {
  const res = await axios.get(`${baseUrl}`);
  return res.data;
};

const createUser = async (userInfo: RegisterInfo) => {
  const res = await axios.post(`${baseUrl}`, userInfo);
  return res.data;
};

const usersApi = {
  getAllUsers,
  createUser,
};

export default usersApi;
