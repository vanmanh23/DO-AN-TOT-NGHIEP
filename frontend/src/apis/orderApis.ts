import axiosClient from "./axiosClient";
import type { ApiResponse, ChangeStatus, Modality, Order, OrderResponse, ReportResult, StudyResponse } from "../types/order";

const orderApis = {
  getAll: (): Promise<ApiResponse<OrderResponse[]>> => axiosClient.get("/orders"),

  getByType: (type: string) : Promise<ApiResponse<Modality[]>> => axiosClient.get(`/modalities/type/${type}`),
  
  getById: (id: string) : Promise<ApiResponse<OrderResponse>> => axiosClient.get(`/orders/${id}`),

  create: (data: Order): Promise<ApiResponse<OrderResponse>> => axiosClient.post("/orders", data),

  update: (id: string, data: Order): Promise<ApiResponse<OrderResponse>> => axiosClient.put(`/orders/${id}`, data),

  delete: (id: string) => axiosClient.delete(`/orders/${id}`),

  ChangeStatus: (data: ChangeStatus) => axiosClient.put(`/orders/change-status`, data),

  openReport: (id: string) => axiosClient.get(`/report-results/generate_pdf/${id}`),

  generateReport: (data: ReportResult) => axiosClient.post(`/report-results`, data),

  getByStatus: (status: string): Promise<ApiResponse<OrderResponse[]>> => axiosClient.get(`/orders/status/${status}`),

  createStudy: (data: StudyResponse) => axiosClient.post(`/studies`, data),
};

export default orderApis;