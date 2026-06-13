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
import {
  AnalysisResult,
  CreateProjectInput,
  ProjectCard,
  ProjectStatus,
  ReportsData,
  Sprint,
  TimelineItem,
  UserProfile,
  WbsNode,
} from "@/types/project";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

interface BackendProject {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  analysisJson?: unknown;
}

interface BackendDashboardStats {
  totalProjects: number;
  analyzedProjects: number;
  pendingAnalysis: number;
  recentProjects: Array<{
    id: string;
    name: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

interface BackendAnalysis {
  summary?: string;
  goals?: string[];
  modules?: string[];
  assumptions?: string[];
  dependencies?: string[];
  risks?: unknown[];
  milestones?: unknown[];
  wbs?: unknown[];
  sprints?: unknown[];
  timeline?: unknown[];
}

function mapStatus(status: string): ProjectStatus {
  if (status === "ANALYZED") return "Completed";
  if (status === "UPLOADED") return "Analyzing";
  if (status === "CREATED") return "In Planning";
  return "At Risk";
}

function toIsoDate(value: string | undefined) {
  if (!value) return new Date().toISOString().slice(0, 10);
  return value.slice(0, 10);
}

function mapProjectCard(project: BackendProject): ProjectCard {
  return {
    id: project.id,
    name: project.name,
    status: mapStatus(project.status),
    uploadedAt: toIsoDate(project.createdAt),
    generatedReports: project.analysisJson ? 1 : 0,
  };
}

function normalizeImpact(value: string): "Low" | "Medium" | "High" {
  const normalized = value.toLowerCase();
  if (normalized.includes("high")) return "High";
  if (normalized.includes("medium")) return "Medium";
  return "Low";
}

function toRiskItems(risks: unknown[] | undefined) {
  return (risks || []).map((item, index) => {
    if (typeof item === "string") {
      return { name: item, impact: "Medium" as const };
    }

    if (
      item &&
      typeof item === "object" &&
      "name" in item &&
      "impact" in item &&
      typeof item.name === "string" &&
      typeof item.impact === "string"
    ) {
      return {
        name: item.name,
        impact: normalizeImpact(item.impact),
      };
    }

    return {
      name: `Risk ${index + 1}`,
      impact: "Medium" as const,
    };
  });
}

function toMilestoneItems(milestones: unknown[] | undefined) {
  return (milestones || []).map((item, index) => {
    if (typeof item === "string") {
      return {
        name: item,
        date: "TBD",
        progress: 0,
      };
    }

    if (
      item &&
      typeof item === "object" &&
      "name" in item &&
      "date" in item &&
      "progress" in item &&
      typeof item.name === "string" &&
      typeof item.date === "string" &&
      typeof item.progress === "number"
    ) {
      return {
        name: item.name,
        date: item.date,
        progress: item.progress,
      };
    }

    return {
      name: `Milestone ${index + 1}`,
      date: "TBD",
      progress: 0,
    };
  });
}

function toAnalysisResult(
  projectId: string,
  data: BackendAnalysis,
): AnalysisResult {
  return {
    projectId,
    summary: data.summary || "Analysis summary unavailable.",
    goals: data.goals || [],
    modules: data.modules || [],
    assumptions: data.assumptions || [],
    dependencies: data.dependencies || [],
    risks: toRiskItems(data.risks),
    milestones: toMilestoneItems(data.milestones),
  };
}

function toWbsNodes(rawWbs: unknown[] | undefined): WbsNode[] {
  return (rawWbs || []).map((item, index) => ({
    id: `${index + 1}`,
    title: typeof item === "string" ? item : `Work Item ${index + 1}`,
    estimateHours: 8,
    children: [],
  }));
}

function toSprints(rawSprints: unknown[] | undefined): Sprint[] {
  return (rawSprints || []).map((item, index) => {
    const text = typeof item === "string" ? item : `Sprint ${index + 1}`;
    return {
      id: `sp-${index + 1}`,
      name: `Sprint ${index + 1}`,
      goal: text,
      storyPoints: 8,
      tasks: [
        {
          id: `sp-${index + 1}-task-1`,
          title: text,
          estimateHours: 8,
        },
      ],
    };
  });
}

function toTimeline(rawTimeline: unknown[] | undefined): TimelineItem[] {
  const base = new Date();
  return (rawTimeline || []).map((item, index) => {
    const startDate = new Date(base);
    startDate.setDate(base.getDate() + index * 7);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    return {
      id: `tl-${index + 1}`,
      module: typeof item === "string" ? item : `Module ${index + 1}`,
      start: startDate.toISOString().slice(0, 10),
      end: endDate.toISOString().slice(0, 10),
    };
  });
}

function toReportsData(analysis: BackendAnalysis): ReportsData {
  const modules = analysis.modules || [];
  const risks = toRiskItems(analysis.risks);
  const milestones = toMilestoneItems(analysis.milestones);
  const sprints = toSprints(analysis.sprints);

  return {
    effortByModule: modules.map((module, index) => ({
      module,
      effort: (index + 1) * 10,
    })),
    sprintDistribution: sprints.map((sprint) => ({
      sprint: sprint.name,
      points: sprint.storyPoints,
    })),
    riskDistribution: ["High", "Medium", "Low"].map((level) => ({
      name: level,
      value: risks.filter((risk) => risk.impact === level).length,
    })),
    milestoneProgress: milestones.map((milestone) => ({
      milestone: milestone.name,
      progress: milestone.progress,
    })),
  };
}

async function getAnalysisEnvelope(projectId: string) {
  const { data } = await apiClient.get<ApiEnvelope<BackendAnalysis>>(
    `/analysis/${projectId}`,
  );
  return data.data;
}

export const projectService = {
  getRecentProjects: async () => {
    if (useMock) return getRecentProjects();
    const { data } =
      await apiClient.get<ApiEnvelope<BackendProject[]>>("/projects");
    return data.data.map(mapProjectCard);
  },

  getDashboardMetrics: async () => {
    if (useMock) return getDashboardMetrics();
    const { data } =
      await apiClient.get<ApiEnvelope<BackendDashboardStats>>(
        "/dashboard/stats",
      );
    return {
      totalProjects: data.data.totalProjects,
      activeProjects: data.data.pendingAnalysis,
      generatedReports: data.data.analyzedProjects,
    };
  },

  createProject: async (input: CreateProjectInput) => {
    if (useMock) return createProject(input);
    const { data } = await apiClient.post<ApiEnvelope<BackendProject>>(
      "/projects",
      input,
    );
    return mapProjectCard(data.data);
  },

  uploadProjectDocument: async (projectId: string, file: File) => {
    if (useMock) return uploadProjectDocument(projectId, file);

    const formData = new FormData();
    formData.append("file", file);

    await apiClient.post(`/documents/${projectId}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const { data } = await apiClient.post<ApiEnvelope<BackendProject>>(
      `/analysis/${projectId}/analyze`,
    );

    return mapProjectCard(data.data);
  },

  getAnalysisResult: async (projectId: string) => {
    if (useMock) return getAnalysisResult(projectId);

    const analysis = await getAnalysisEnvelope(projectId);
    return toAnalysisResult(projectId, analysis);
  },

  getWbs: async (projectId: string) => {
    if (useMock) return getWbs(projectId);

    const analysis = await getAnalysisEnvelope(projectId);
    return toWbsNodes(analysis.wbs);
  },

  getSprints: async (projectId: string) => {
    if (useMock) return getSprints(projectId);

    const analysis = await getAnalysisEnvelope(projectId);
    return toSprints(analysis.sprints);
  },

  getTimeline: async (projectId: string) => {
    if (useMock) return getTimeline(projectId);

    const analysis = await getAnalysisEnvelope(projectId);
    return toTimeline(analysis.timeline);
  },

  getReports: async (projectId: string) => {
    if (useMock) return getReports(projectId);

    const analysis = await getAnalysisEnvelope(projectId);
    return toReportsData(analysis);
  },

  getProjectHistory: async (projectId: string) => {
    if (useMock) return getProjectHistory(projectId);

    const { data } = await apiClient.get<ApiEnvelope<BackendProject>>(
      `/projects/${projectId}`,
    );
    return [mapProjectCard(data.data)];
  },

  getUserProfile: async () => {
    if (useMock) return getUserProfile();

    const { data } =
      await apiClient.get<
        ApiEnvelope<{ id: string; email: string; name: string }>
      >("/users/me");
    const profile: UserProfile = {
      name: data.data.name,
      email: data.data.email,
      role: "Project Manager",
      timezone: "UTC",
      notifications: true,
    };
    return profile;
  },
};
