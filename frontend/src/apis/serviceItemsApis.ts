import type { ApiResponse, ServiceItem } from "../types/order";
import axiosClient from "./axiosClient";


const serviceItemsApis = {
//   getAll: (): Promise<ApiResponse<OrderResponse[]>> => axiosClient.get("/orders"),

  getByType: (type: string) : Promise<ApiResponse<ServiceItem[]>> => axiosClient.get(`/service-items/type/${type}`),

//   create: (data: Order) => axiosClient.post("/orders", data),

//   update: (id: string, data: Order) => axiosClient.put(`/orders/${id}`, data),

//   delete: (id: string) => axiosClient.delete(`/orders/${id}`),
};

export default serviceItemsApis;