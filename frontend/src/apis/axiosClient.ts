import axios from "axios";
const baseURL = import.meta.env.VITE_USER_URL;
const axiosClient = axios.create({
  baseURL: baseURL, // URL gốc của API
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // nếu API có cookie/session
});

// ✅ Interceptor: thêm token, xử lý lỗi chung
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Ví dụ: tự động logout nếu token hết hạn
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
