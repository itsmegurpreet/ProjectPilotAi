import fs from "fs/promises";
import { AppError } from "@/common/errors/app-error";
import { projectRepository } from "@/features/projects/project.repository";

export const projectService = {
  createProject(userId: string, name: string) {
    return projectRepository.create(userId, name);
  },

  listProjects(userId: string) {
    return projectRepository.findManyByUserId(userId);
  },

  async getProject(userId: string, projectId: string) {
    const project = await projectRepository.findByIdAndUserId(
      projectId,
      userId,
    );
    if (!project) {
      throw new AppError("Project not found", 404);
    }
    return project;
  },

  async deleteProject(userId: string, projectId: string) {
    const project = await this.getProject(userId, projectId);

    if (project.filePath) {
      await fs.unlink(project.filePath).catch(() => null);
    }

    await projectRepository.deleteById(project.id);
    return { deleted: true };
  },
};
