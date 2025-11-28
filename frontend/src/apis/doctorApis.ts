import type { ApiResponse, DoctorResponse } from "../types/order";
import axiosClient from "./axiosClient";

const doctorsApi = {
  getAll: (): Promise<ApiResponse<DoctorResponse[]>> => axiosClient.get("/doctors"),

//   getById: (id: string): Promise<ApiResponse<DoctorResponse>> =>
//     axiosClient.get(`/patients/${id}`),

//   create: (data: Patient) :  Promise<ApiResponse<DoctorResponse>> => axiosClient.post("/patients", data),

//   update: (id: string, data: Patient) => axiosClient.put(`/patients/${id}`, data),
  // delete: (id) => axiosClient.delete(`/users/${id}`),
};

export default doctorsApi;