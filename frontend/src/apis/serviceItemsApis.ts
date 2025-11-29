import type { ApiResponse, Modality, ServiceItem, ServiceItemRequest } from "../types/order";
import axiosClient from "./axiosClient";


const serviceItemsApis = {
  getAll: (): Promise<ApiResponse<ServiceItem[]>> => axiosClient.get("/service-items"),

  getByType: (type: string) : Promise<ApiResponse<ServiceItem[]>> => axiosClient.get(`/service-items/type/${type}`),

  findAllModalities: () : Promise<ApiResponse<Modality[]>> => axiosClient.get(`/modalities`),

  create: (data: ServiceItemRequest) => axiosClient.post("/service-items", data),

  update: (id: string, data: ServiceItemRequest) => axiosClient.put(`/service-items/${id}`, data),

  delete: (id: string) => axiosClient.delete(`/service-items/${id}`),
};

export default serviceItemsApis;