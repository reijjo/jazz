import axios from "axios";

// Add a proxy to package.json and then use
// const baseUrl = '/users'
const baseUrl = "http://localhost:3001/users";

const getAllUsers = async () => {
  const res = await axios.get(`${baseUrl}`);
  return res.data;
};

const usersApi = {
  getAllUsers,
};

export default usersApi;
