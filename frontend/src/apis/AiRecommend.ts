import axios from "axios";
import type { AIPredict } from "../types/order";

const url = import.meta.env.VITE_AI_URL;

export const getNutriRecommend = async (data: AIPredict) => {
  const res = await axios
    .post(`${url}/predict`, data)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
};