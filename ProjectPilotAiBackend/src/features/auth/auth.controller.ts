import { Request, Response } from "express";
import { authService } from "@/features/auth/auth.service";

export const authController = {
  async register(req: Request, res: Response) {
    const result = await authService.register(req.body);
    return res.status(201).json({ success: true, data: result });
  },

  async login(req: Request, res: Response) {
    const result = await authService.login(req.body);
    return res.status(200).json({ success: true, data: result });
  },

  async refresh(req: Request, res: Response) {
    const result = await authService.refresh(req.body.refreshToken);
    return res.status(200).json({ success: true, data: result });
  },

  async logout(_req: Request, res: Response) {
    return res.status(200).json({ success: true, message: "Logged out" });
  },
};
