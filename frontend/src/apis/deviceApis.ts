import type { ApiResponse, Department, Modality } from "../types/order";
import axiosClient from "./axiosClient";

const devicesApi = {
  getAll: (): Promise<ApiResponse<Modality[]>> => axiosClient.get("/modalities"),

  create: (data: Modality) :  Promise<ApiResponse<Modality>> => axiosClient.post("/modalities", data),

  update: (id: string, data: Modality) => axiosClient.put(`/modalities/${id}`, data),

  delete: (id: string) => axiosClient.delete(`/modalities/${id}`),

  getAllDepartments: (): Promise<ApiResponse<Department[]>> => axiosClient.get("/departments"),

  createDepartment: (data: Department) :  Promise<ApiResponse<Department>> => axiosClient.post("/departments", data),
};

export default devicesApi;