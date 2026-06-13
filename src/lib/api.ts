import { z } from "zod";
import {
  analysisResult,
  profile,
  projects,
  reports,
  sprints,
  timeline,
  wbs,
} from "@/lib/mock-data";
import { CreateProjectInput } from "@/types/project";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const uploadSchema = z.object({
  name: z.string().min(1),
  size: z.number().max(10 * 1024 * 1024),
  type: z.enum([
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]),
});

const createProjectSchema = z.object({
  name: z.string().min(3).max(120),
});

function findProject(projectId: string) {
  return projects.find((project) => project.id === projectId);
}

export async function getRecentProjects() {
  await delay(500);
  return projects;
}

export async function getDashboardMetrics() {
  await delay(350);
  return {
    totalProjects: projects.length,
    activeProjects: projects.filter((p) => p.status !== "Completed").length,
    generatedReports: projects.reduce((sum, p) => sum + p.generatedReports, 0),
  };
}

export async function createProject(input: CreateProjectInput) {
  createProjectSchema.parse(input);
  await delay(350);
  const next = {
    id: `p-${Math.floor(Math.random() * 900 + 100)}`,
    name: input.name,
    status: "Analyzing" as const,
    uploadedAt: new Date().toISOString().slice(0, 10),
    generatedReports: 0,
  };
  projects.unshift(next);
  return next;
}

export async function uploadProjectDocument(projectId: string, file: File) {
  uploadSchema.parse({ name: file.name, size: file.size, type: file.type });
  if (!findProject(projectId)) {
    throw new Error("Project not found.");
  }
  await delay(1000);
  return {
    success: true,
    message: "Document uploaded and queued for analysis.",
    projectId,
  };
}

export async function getAnalysisResult(projectId: string) {
  await delay(400);
  if (!findProject(projectId)) {
    throw new Error("Project not found.");
  }
  return {
    ...analysisResult,
    projectId,
  };
}

export async function getWbs(projectId: string) {
  await delay(450);
  if (!findProject(projectId)) {
    throw new Error("Project not found.");
  }
  return wbs;
}

export async function getSprints(projectId: string) {
  await delay(450);
  if (!findProject(projectId)) {
    throw new Error("Project not found.");
  }
  return sprints;
}

export async function getTimeline(projectId: string) {
  await delay(450);
  if (!findProject(projectId)) {
    throw new Error("Project not found.");
  }
  return timeline;
}

export async function getReports(projectId: string) {
  await delay(450);
  if (!findProject(projectId)) {
    throw new Error("Project not found.");
  }
  return reports;
}

export async function getProjectHistory(projectId: string) {
  await delay(300);
  const project = findProject(projectId);
  if (!project) {
    throw new Error("Project not found.");
  }
  return [project];
}

export async function getUserProfile() {
  await delay(300);
  return profile;
}
