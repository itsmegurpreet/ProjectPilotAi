import jwt from "jsonwebtoken";
import { env } from "@/config/env";

interface TokenPayload {
  userId: string;
  email: string;
}

export function signAccessToken(payload: TokenPayload) {
  const expiresIn = env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions["expiresIn"];
  if (!expiresIn) {
    throw new Error("JWT_ACCESS_EXPIRES_IN is required");
  }

  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn,
  });
}

export function signRefreshToken(payload: TokenPayload) {
  const expiresIn = env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions["expiresIn"];
  if (!expiresIn) {
    throw new Error("JWT_REFRESH_EXPIRES_IN is required");
  }

  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn,
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
}
