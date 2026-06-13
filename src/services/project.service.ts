import { apiClient } from "@/lib/axios";
import {
  createProject,
  getAnalysisResult,
  getDashboardMetrics,
  getProjectHistory,
  getRecentProjects,
  getReports,
  getSprints,
  getTimeline,
  getUserProfile,
  getWbs,
  uploadProjectDocument,
} from "@/lib/api";
import { CreateProjectInput } from "@/types/project";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

export const projectService = {
  getRecentProjects: async () => {
    if (useMock) return getRecentProjects();
    const { data } = await apiClient.get("/projects/recent");
    return data;
  },
  getDashboardMetrics: async () => {
    if (useMock) return getDashboardMetrics();
    const { data } = await apiClient.get("/dashboard/metrics");
    return data;
  },
  createProject: async (input: CreateProjectInput) => {
    if (useMock) return createProject(input);
    const { data } = await apiClient.post("/projects", input);
    return data;
  },
  uploadProjectDocument: async (projectId: string, file: File) => {
    if (useMock) return uploadProjectDocument(projectId, file);
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await apiClient.post(
      `/projects/${projectId}/documents/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return data;
  },
  getAnalysisResult: async (projectId: string) => {
    if (useMock) return getAnalysisResult(projectId);
    const { data } = await apiClient.get(`/projects/${projectId}/analysis`);
    return data;
  },
  getWbs: async (projectId: string) => {
    if (useMock) return getWbs(projectId);
    const { data } = await apiClient.get(`/projects/${projectId}/wbs`);
    return data;
  },
  getSprints: async (projectId: string) => {
    if (useMock) return getSprints(projectId);
    const { data } = await apiClient.get(`/projects/${projectId}/sprints`);
    return data;
  },
  getTimeline: async (projectId: string) => {
    if (useMock) return getTimeline(projectId);
    const { data } = await apiClient.get(`/projects/${projectId}/timeline`);
    return data;
  },
  getReports: async (projectId: string) => {
    if (useMock) return getReports(projectId);
    const { data } = await apiClient.get(`/projects/${projectId}/reports`);
    return data;
  },
  getProjectHistory: async (projectId: string) => {
    if (useMock) return getProjectHistory(projectId);
    const { data } = await apiClient.get(`/projects/${projectId}/history`);
    return data;
  },
  getUserProfile: async () => {
    if (useMock) return getUserProfile();
    const { data } = await apiClient.get("/users/me");
    return data;
  },
};
