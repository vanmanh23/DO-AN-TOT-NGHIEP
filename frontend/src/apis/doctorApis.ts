import type { ApiResponse, DoctorResponse } from "../types/order";
import axiosClient from "./axiosClient";

const doctorsApi = {
  getAll: (): Promise<ApiResponse<DoctorResponse[]>> => axiosClient.get("/doctors"),

//   getById: (id: string): Promise<ApiResponse<DoctorResponse>> =>
//     axiosClient.get(`/patients/${id}`),

  create: (data: DoctorResponse) :  Promise<ApiResponse<DoctorResponse>> => axiosClient.post("/doctors", data),

  update: (id: string, data: DoctorResponse) => axiosClient.put(`/doctors/${id}`, data),

  delete: (id: string) => axiosClient.delete(`/doctors/${id}`),
};

export default doctorsApi;