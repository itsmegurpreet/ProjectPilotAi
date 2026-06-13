import { Request, Response } from "express";
import { documentService } from "@/features/documents/document.service";

export const documentController = {
  async upload(req: Request, res: Response) {
    const projectId = String(req.params.id);
    const project = await documentService.upload(
      req.user!.userId,
      projectId,
      req.file,
    );
    return res.status(200).json({ success: true, data: project });
  },

  async getDocument(req: Request, res: Response) {
    const projectId = String(req.params.id);
    const doc = await documentService.getDocument(req.user!.userId, projectId);
    return res.download(doc.filePath, doc.originalFileName);
  },
};
