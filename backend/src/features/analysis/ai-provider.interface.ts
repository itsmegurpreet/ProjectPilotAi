import { ProjectAnalysisJson } from "@/common/utils/analysis-template";

export interface AIProvider {
  analyzeRequirements(input: string): Promise<ProjectAnalysisJson>;
  generateWBS(input: string): Promise<string[]>;
  generateSprintPlan(input: string): Promise<string[]>;
  generateTimeline(input: string): Promise<string[]>;
}
