import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again.";

    return Promise.reject(new Error(message));
  },
);
