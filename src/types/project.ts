export type ProjectStatus =
  | "Analyzing"
  | "In Planning"
  | "Completed"
  | "At Risk";

export interface ProjectCard {
  id: string;
  name: string;
  status: ProjectStatus;
  uploadedAt: string;
  generatedReports: number;
}

export interface AnalysisResult {
  projectId: string;
  summary: string;
  goals: string[];
  modules: string[];
  assumptions: string[];
  dependencies: string[];
  risks: Array<{ name: string; impact: "Low" | "Medium" | "High" }>;
  milestones: Array<{ name: string; date: string; progress: number }>;
}

export interface WbsNode {
  id: string;
  title: string;
  estimateHours: number;
  children?: WbsNode[];
}

export interface Sprint {
  id: string;
  name: string;
  goal: string;
  storyPoints: number;
  tasks: Array<{ id: string; title: string; estimateHours: number }>;
}

export interface TimelineItem {
  id: string;
  module: string;
  start: string;
  end: string;
  milestone?: string;
}

export interface ReportsData {
  effortByModule: Array<{ module: string; effort: number }>;
  sprintDistribution: Array<{ sprint: string; points: number }>;
  riskDistribution: Array<{ name: string; value: number }>;
  milestoneProgress: Array<{ milestone: string; progress: number }>;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  timezone: string;
  notifications: boolean;
}

export interface CreateProjectInput {
  name: string;
}
