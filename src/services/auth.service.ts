import { apiClient } from "@/lib/axios";
import { clearAuthTokens, saveAuthTokens } from "@/lib/auth";

interface AuthPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends AuthPayload {
  name: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async login(payload: AuthPayload) {
    const { data } = await apiClient.post<{ success: boolean; data: AuthResponse }>(
      "/auth/login",
      payload,
    );
    saveAuthTokens({
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken,
    });
    return data.data.user;
  },

  async register(payload: RegisterPayload) {
    const { data } = await apiClient.post<{ success: boolean; data: AuthResponse }>(
      "/auth/register",
      payload,
    );
    saveAuthTokens({
      accessToken: data.data.accessToken,
      refreshToken: data.data.refreshToken,
    });
    return data.data.user;
  },

  async logout() {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      clearAuthTokens();
    }
  },
};
