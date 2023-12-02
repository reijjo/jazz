import axios from "axios";
import { LoginInfo } from "../utils/types";

const baseUrl = "http://localhost:3001/auth";

const login = async (user: LoginInfo) => {
  const res = await axios.post(`${baseUrl}/login`, user);
  return res.data;
};

const authApi = {
  login,
};

export default authApi;
