import { AppError } from "@/common/errors/app-error";
import { comparePassword, hashPassword } from "@/common/utils/password";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/common/utils/jwt";
import { authRepository } from "@/features/auth/auth.repository";

export const authService = {
  async register(input: { email: string; password: string; name: string }) {
    const existing = await authRepository.findByEmail(input.email);
    if (existing) {
      throw new AppError("Email already exists", 409);
    }

    const password = await hashPassword(input.password);
    const user = await authRepository.createUser(
      input.email,
      password,
      input.name,
    );
    const accessToken = signAccessToken({ userId: user.id, email: user.email });
    const refreshToken = signRefreshToken({
      userId: user.id,
      email: user.email,
    });

    return {
      user: { id: user.id, email: user.email, name: user.name },
      accessToken,
      refreshToken,
    };
  },

  async login(input: { email: string; password: string }) {
    const user = await authRepository.findByEmail(input.email);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const matched = await comparePassword(input.password, user.password);
    if (!matched) {
      throw new AppError("Invalid credentials", 401);
    }

    const accessToken = signAccessToken({ userId: user.id, email: user.email });
    const refreshToken = signRefreshToken({
      userId: user.id,
      email: user.email,
    });

    return {
      user: { id: user.id, email: user.email, name: user.name },
      accessToken,
      refreshToken,
    };
  },

  async refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);
    const user = await authRepository.findByEmail(payload.email);
    if (!user || user.id !== payload.userId) {
      throw new AppError("Invalid refresh token", 401);
    }

    return {
      accessToken: signAccessToken({ userId: user.id, email: user.email }),
      refreshToken: signRefreshToken({ userId: user.id, email: user.email }),
    };
  },
};
