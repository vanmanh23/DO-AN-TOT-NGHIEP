import axiosClient from "./axiosClient";
import type { PatientProps } from "../types/types";
import type { ApiResponse } from "../types/order";

const patientApi = {
  // Returns the API shape { result: PatientStudyProps[] } (as your components expect .result)
  getAll: (): Promise<{ result: PatientProps[] }> =>
    axiosClient.get("/patients"),

  getById: (id: string): Promise<PatientProps> =>
    axiosClient.get(`/patients/${id}`),

  create: (data) :  Promise<ApiResponse<PatientResponse>> => axiosClient.post("/users", data),
  // update: (id, data) => axiosClient.put(`/users/${id}`, data),
  // delete: (id) => axiosClient.delete(`/users/${id}`),
};

export default patientApi;