import { Request, Response } from "express";
import { analysisService } from "@/features/analysis/analysis.service";

export const analysisController = {
  async analyze(req: Request, res: Response) {
    const projectId = String(req.params.id);
    const project = await analysisService.analyzeProject(
      req.user!.userId,
      projectId,
    );
    return res.status(200).json({ success: true, data: project });
  },

  async getAnalysis(req: Request, res: Response) {
    const projectId = String(req.params.id);
    const analysis = await analysisService.getAnalysis(
      req.user!.userId,
      projectId,
    );
    return res.status(200).json({ success: true, data: analysis });
  },
};
