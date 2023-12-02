import axios, { isAxiosError } from "axios";
import { RegisterInfo } from "../utils/types";

// Add a proxy to package.json and then use
// const baseUrl = '/users'
const baseUrl = "http://localhost:3001/users";

// Use with token
// const withToken = axios.create({
//   baseURL: baseUrl,
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("yatzy")}`,
//   },
// });

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("yatzy")}` },
};

const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}`, config);
    // const res = await withToken.get("/");
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.log(error.response?.data?.message);
    }
  }
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
