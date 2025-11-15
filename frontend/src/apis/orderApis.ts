import axiosClient from "./axiosClient";
import type { ApiResponse, Modality } from "../types/order";

const orderApis = {
  getAll: () => axiosClient.get("/modalities"),

  getByType: (type: string) : Promise<ApiResponse<Modality[]>> => axiosClient.get(`/modalities/type/${type}`),

  // create: (data) => axiosClient.post("/users", data),
  // update: (id, data) => axiosClient.put(`/users/${id}`, data),
  // delete: (id) => axiosClient.delete(`/users/${id}`),
};

export default orderApis;