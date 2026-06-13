import { NextFunction, Request, Response } from "express";
import { AppError } from "@/common/errors/app-error";
import { verifyAccessToken } from "@/common/utils/jwt";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", 401);
  }

  const token = header.slice(7);
  const payload = verifyAccessToken(token);
  req.user = payload;
  next();
}
