import type { ApiResponse, PaymentRequest, PaymentResponse } from "../types/order";
import axiosClient from "./axiosClient";


const paymentApis = {
  getAll: (): Promise<ApiResponse<PaymentResponse[]>> => axiosClient.get("/payments"),

  create: (data: PaymentRequest) :  Promise<ApiResponse<PaymentResponse>> => axiosClient.post("/payments", data),

  update: (id: string, data: PaymentRequest) => axiosClient.put(`/payments/${id}`, data),

  delete: (id: string) => axiosClient.delete(`/payments/${id}`),

  vnPay: (amount: string, orderId: string) : Promise<string> => axiosClient.post(`/vnpay?amount=${amount}&orderInfo=${orderId}`),

  changeStatus: (id: string): Promise<ApiResponse<PaymentResponse>> => axiosClient.put(`/payments/status/${id}`),
};

export default paymentApis;