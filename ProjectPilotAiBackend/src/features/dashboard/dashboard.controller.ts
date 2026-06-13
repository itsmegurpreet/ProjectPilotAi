import { Request, Response } from "express";
import { dashboardService } from "@/features/dashboard/dashboard.service";

export const dashboardController = {
  async stats(req: Request, res: Response) {
    const data = await dashboardService.getStats(req.user!.userId);
    return res.status(200).json({ success: true, data });
  },
};
