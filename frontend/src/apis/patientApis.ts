import axiosClient from "./axiosClient";
import type {
  AgeGroupPatient,
  ApiResponse,
  Patient,
  PatientDTO,
  PatientResponse,
} from "../types/order";

const patientApi = {
  getAll: (): Promise<ApiResponse<PatientResponse[]>> =>
    axiosClient.get("/patients"),

  getById: (id: string): Promise<ApiResponse<PatientDTO>> =>
    axiosClient.get(`/patients/${id}`),

  create: (data: Patient): Promise<ApiResponse<PatientResponse>> =>
    axiosClient.post("/patients", data),

  update: (id: string, data: Patient) =>
    axiosClient.put(`/patients/${id}`, data),

  delete: (id: string) => axiosClient.delete(`/patients/${id}`),

  patientCount: (): Promise<ApiResponse<number>> =>
    axiosClient.get("/patients/count"),

  ageGroups: (): Promise<ApiResponse<AgeGroupPatient[]>> =>
    axiosClient.get("/patients/age-groups"),
};

export default patientApi;
