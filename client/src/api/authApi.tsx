import axios from "axios";
import { LoginInfo } from "../utils/types";

// const baseUrl = "https://yatzy-gl0g.onrender.com/auth";
const baseUrl = "http://localhost:3001/auth";

const login = async (user: LoginInfo) => {
  const res = await axios.post(`${baseUrl}/login`, user);
  return res.data;
};

const authorization = async (token: string | null) => {
  const res = await axios.get(`${baseUrl}/orization`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const authApi = {
  login,
  authorization,
};

export default authApi;
