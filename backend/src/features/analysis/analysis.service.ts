import { AppError } from "@/common/errors/app-error";
import { getDefaultAnalysisJson } from "@/common/utils/analysis-template";
import { projectRepository } from "@/features/projects/project.repository";
import { createAIProvider } from "@/features/analysis/provider.factory";

export const analysisService = {
  async analyzeProject(userId: string, projectId: string) {
    const project = await projectRepository.findByIdAndUserId(
      projectId,
      userId,
    );
    if (!project) {
      throw new AppError("Project not found", 404);
    }
    if (!project.extractedText) {
      throw new AppError(
        "No extracted text found. Upload a document first.",
        400,
      );
    }

    const provider = createAIProvider();
    const base = await provider.analyzeRequirements(project.extractedText);
    const wbs = await provider.generateWBS(project.extractedText);
    const sprints = await provider.generateSprintPlan(project.extractedText);
    const timeline = await provider.generateTimeline(project.extractedText);

    const analysisJson = {
      ...getDefaultAnalysisJson(),
      ...base,
      wbs,
      sprints,
      timeline,
    };

    return projectRepository.update(project.id, {
      analysisJson,
      status: "ANALYZED",
    });
  },

  async getAnalysis(userId: string, projectId: string) {
    const project = await projectRepository.findByIdAndUserId(
      projectId,
      userId,
    );
    if (!project) {
      throw new AppError("Project not found", 404);
    }

    return project.analysisJson || getDefaultAnalysisJson();
  },
};
