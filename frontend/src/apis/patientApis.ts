import axiosClient from "./axiosClient";
import type { ApiResponse, Patient, PatientResponse } from "../types/order";

const patientApi = {
  // Returns the API shape { result: PatientStudyProps[] } (as your components expect .result)
  getAll: (): Promise<ApiResponse<PatientResponse[]>> => axiosClient.get("/patients"),

  getById: (id: string): Promise<ApiResponse<PatientResponse>> =>
    axiosClient.get(`/patients/${id}`),

  create: (data: Patient) :  Promise<ApiResponse<PatientResponse>> => axiosClient.post("/patients", data),

  update: (id: string, data: Patient) => axiosClient.put(`/patients/${id}`, data),
  // delete: (id) => axiosClient.delete(`/users/${id}`),
};

export default patientApi;