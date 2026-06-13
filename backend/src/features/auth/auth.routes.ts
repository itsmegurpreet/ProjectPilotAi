import { Router } from "express";
import { authController } from "@/features/auth/auth.controller";
import { asyncHandler } from "@/common/utils/async-handler";
import { validateRequest } from "@/common/middleware/validate.middleware";
import {
  loginSchema,
  refreshSchema,
  registerSchema,
} from "@/features/auth/auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  asyncHandler(authController.register),
);
router.post(
  "/login",
  validateRequest(loginSchema),
  asyncHandler(authController.login),
);
router.post(
  "/refresh",
  validateRequest(refreshSchema),
  asyncHandler(authController.refresh),
);
router.post("/logout", asyncHandler(authController.logout));

export const authRoutes = router;
