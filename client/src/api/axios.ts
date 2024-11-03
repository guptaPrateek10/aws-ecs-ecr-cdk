import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Generic API call function
export const createApiCall = <T>(
  url: string,
  method: string = "GET",
  data?: any
) => {
  const config: AxiosRequestConfig = {
    url,
    method,
    data,
  };

  return axiosInstance.request<any, AxiosResponse<T>>(config);
};

export default axiosInstance;
