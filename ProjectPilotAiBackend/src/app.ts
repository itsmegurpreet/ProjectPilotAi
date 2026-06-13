import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { authRoutes } from "@/features/auth/auth.routes";
import { userRoutes } from "@/features/users/user.routes";
import { projectRoutes } from "@/features/projects/project.routes";
import { documentRoutes } from "@/features/documents/document.routes";
import { analysisRoutes } from "@/features/analysis/analysis.routes";
import { dashboardRoutes } from "@/features/dashboard/dashboard.routes";
import { notFoundMiddleware } from "@/common/middleware/not-found.middleware";
import { errorMiddleware } from "@/common/middleware/error.middleware";

export const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
