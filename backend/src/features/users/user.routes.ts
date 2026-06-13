import { Router } from "express";
import { requireAuth } from "@/common/middleware/auth.middleware";
import { asyncHandler } from "@/common/utils/async-handler";
import { userController } from "@/features/users/user.controller";

const router = Router();

router.get("/me", requireAuth, asyncHandler(userController.me));

export const userRoutes = router;
