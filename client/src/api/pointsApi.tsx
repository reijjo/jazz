import axios from "axios";

// const baseUrl = "http://localhost:3001/points";
const baseUrl = "/points";

const getAllPoints = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const addPoints = async (points: number) => {
  console.log("axios points", points);
  const res = await axios.post(baseUrl, { points });
  return res.data;
};

const pointsApi = {
  getAllPoints,
  addPoints,
};

export default pointsApi;
