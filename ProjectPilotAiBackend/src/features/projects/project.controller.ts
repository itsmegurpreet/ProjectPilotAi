import { Request, Response } from "express";
import { projectService } from "@/features/projects/project.service";

export const projectController = {
  async createProject(req: Request, res: Response) {
    const project = await projectService.createProject(
      req.user!.userId,
      req.body.name,
    );
    return res.status(201).json({ success: true, data: project });
  },

  async listProjects(req: Request, res: Response) {
    const projects = await projectService.listProjects(req.user!.userId);
    return res.status(200).json({ success: true, data: projects });
  },

  async getProject(req: Request, res: Response) {
    const projectId = String(req.params.id);
    const project = await projectService.getProject(
      req.user!.userId,
      projectId,
    );
    return res.status(200).json({ success: true, data: project });
  },

  async deleteProject(req: Request, res: Response) {
    const projectId = String(req.params.id);
    const result = await projectService.deleteProject(
      req.user!.userId,
      projectId,
    );
    return res.status(200).json({ success: true, data: result });
  },
};
