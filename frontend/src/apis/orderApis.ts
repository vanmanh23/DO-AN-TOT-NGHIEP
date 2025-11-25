import axiosClient from "./axiosClient";
import type { ApiResponse, Modality, Order, OrderResponse } from "../types/order";

const orderApis = {
  getAll: (): Promise<ApiResponse<OrderResponse[]>> => axiosClient.get("/orders"),

  getByType: (type: string) : Promise<ApiResponse<Modality[]>> => axiosClient.get(`/modalities/type/${type}`),
  
  getById: (id: string) : Promise<ApiResponse<OrderResponse>> => axiosClient.get(`/orders/${id}`),

  create: (data: Order): Promise<ApiResponse<OrderResponse>> => axiosClient.post("/orders", data),

  update: (id: string, data: Order): Promise<ApiResponse<OrderResponse>> => axiosClient.put(`/orders/${id}`, data),

  delete: (id: string) => axiosClient.delete(`/orders/${id}`),
};

export default orderApis;