import { Router } from "express";
import { requireAuth } from "@/common/middleware/auth.middleware";
import { validateRequest } from "@/common/middleware/validate.middleware";
import { asyncHandler } from "@/common/utils/async-handler";
import { analysisController } from "@/features/analysis/analysis.controller";
import { projectIdParamSchema } from "@/features/analysis/analysis.validation";

const router = Router();

router.post(
  "/:id/analyze",
  requireAuth,
  validateRequest(projectIdParamSchema),
  asyncHandler(analysisController.analyze),
);
router.get(
  "/:id",
  requireAuth,
  validateRequest(projectIdParamSchema),
  asyncHandler(analysisController.getAnalysis),
);

export const analysisRoutes = router;
