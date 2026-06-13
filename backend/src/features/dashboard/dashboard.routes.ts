import { Router } from "express";
import { requireAuth } from "@/common/middleware/auth.middleware";
import { asyncHandler } from "@/common/utils/async-handler";
import { dashboardController } from "@/features/dashboard/dashboard.controller";

const router = Router();

router.get("/stats", requireAuth, asyncHandler(dashboardController.stats));

export const dashboardRoutes = router;
