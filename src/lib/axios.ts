import axios from "axios";
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  saveAuthTokens,
} from "@/lib/auth";

function redirectToLogin() {
  if (typeof window === "undefined") return;

  const onAuthPage =
    window.location.pathname === "/login" ||
    window.location.pathname === "/register";

  if (!onAuthPage) {
    const next = window.location.pathname;
    window.location.href = `/login?next=${encodeURIComponent(next)}`;
  }
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api",
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as {
      _retry?: boolean;
      headers: Record<string, string>;
      url?: string;
    };

    const isUnauthorized = error?.response?.status === 401;
    const refreshToken = getRefreshToken();
    const isRefreshCall = originalRequest?.url?.includes("/auth/refresh");

    if (isUnauthorized && (!refreshToken || isRefreshCall)) {
      clearAuthTokens();
      redirectToLogin();
    }

    if (
      isUnauthorized &&
      !originalRequest?._retry &&
      refreshToken &&
      !isRefreshCall
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post<{
          success: boolean;
          data: { accessToken: string; refreshToken: string };
        }>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api"}/auth/refresh`,
          { refreshToken },
          { timeout: 15000 },
        );

        saveAuthTokens({
          accessToken: refreshResponse.data.data.accessToken,
          refreshToken: refreshResponse.data.data.refreshToken,
        });

        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.data.accessToken}`;
        return apiClient(originalRequest);
      } catch {
        clearAuthTokens();
        redirectToLogin();
      }
    }

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again.";

    return Promise.reject(new Error(message));
  },
);
