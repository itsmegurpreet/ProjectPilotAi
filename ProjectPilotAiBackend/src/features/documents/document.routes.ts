import { Router } from "express";
import { requireAuth } from "@/common/middleware/auth.middleware";
import { validateRequest } from "@/common/middleware/validate.middleware";
import { asyncHandler } from "@/common/utils/async-handler";
import { projectIdParamSchema } from "@/features/documents/document.validation";
import { documentController } from "@/features/documents/document.controller";
import { uploadDocument } from "@/features/documents/upload.middleware";

const router = Router();

router.post(
  "/:id/upload",
  requireAuth,
  validateRequest(projectIdParamSchema),
  uploadDocument.single("file"),
  asyncHandler(documentController.upload),
);
router.get(
  "/:id",
  requireAuth,
  validateRequest(projectIdParamSchema),
  asyncHandler(documentController.getDocument),
);

export const documentRoutes = router;
