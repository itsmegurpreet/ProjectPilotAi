import path from "path";
import { AppError } from "@/common/errors/app-error";
import { projectRepository } from "@/features/projects/project.repository";
import { documentParserService } from "@/features/documents/document-parser.service";

export const documentService = {
  async upload(userId: string, projectId: string, file?: Express.Multer.File) {
    if (!file) {
      throw new AppError("No file uploaded", 400);
    }

    const project = await projectRepository.findByIdAndUserId(
      projectId,
      userId,
    );
    if (!project) {
      throw new AppError("Project not found", 404);
    }

    const extractedText = await documentParserService.extractText(
      file.path,
      file.mimetype,
    );

    return projectRepository.update(project.id, {
      originalFileName: file.originalname,
      filePath: file.path,
      extractedText,
      status: "UPLOADED",
    });
  },

  async getDocument(userId: string, projectId: string) {
    const project = await projectRepository.findByIdAndUserId(
      projectId,
      userId,
    );
    if (!project || !project.filePath) {
      throw new AppError("Document not found", 404);
    }

    return {
      filePath: path.resolve(project.filePath),
      originalFileName: project.originalFileName || "document",
    };
  },
};
