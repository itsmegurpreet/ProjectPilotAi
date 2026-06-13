import { Router } from "express";
import { requireAuth } from "@/common/middleware/auth.middleware";
import { validateRequest } from "@/common/middleware/validate.middleware";
import { asyncHandler } from "@/common/utils/async-handler";
import { projectController } from "@/features/projects/project.controller";
import {
  createProjectSchema,
  projectIdParamSchema,
} from "@/features/projects/project.validation";

const router = Router();

router.post(
  "/",
  requireAuth,
  validateRequest(createProjectSchema),
  asyncHandler(projectController.createProject),
);
router.get("/", requireAuth, asyncHandler(projectController.listProjects));
router.get(
  "/:id",
  requireAuth,
  validateRequest(projectIdParamSchema),
  asyncHandler(projectController.getProject),
);
router.delete(
  "/:id",
  requireAuth,
  validateRequest(projectIdParamSchema),
  asyncHandler(projectController.deleteProject),
);

export const projectRoutes = router;
