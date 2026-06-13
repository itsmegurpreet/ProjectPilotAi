import { AIProvider } from "@/features/analysis/ai-provider.interface";
import {
  getDefaultAnalysisJson,
  ProjectAnalysisJson,
} from "@/common/utils/analysis-template";

export class MockProvider implements AIProvider {
  async analyzeRequirements(input: string): Promise<ProjectAnalysisJson> {
    const base = getDefaultAnalysisJson();
    return {
      ...base,
      summary: `MVP analysis generated from ${Math.min(input.length, 5000)} characters of requirements.`,
      goals: ["Define product scope", "Deliver MVP in iterative sprints"],
      modules: ["Auth", "Project Management", "Analysis"],
      assumptions: ["Stakeholders provide timely feedback"],
      dependencies: ["AI provider availability", "Requirement quality"],
      risks: ["Ambiguous requirements", "Integration delay"],
      milestones: ["MVP design", "Implementation", "Validation"],
      wbs: ["Set up backend", "Implement upload", "Generate analysis"],
      sprints: ["Sprint 1: Core setup", "Sprint 2: Analysis APIs"],
      timeline: ["Week 1: Setup", "Week 2: Delivery"],
    };
  }

  async generateWBS(): Promise<string[]> {
    return [
      "WBS: Requirement parsing",
      "WBS: AI transformation",
      "WBS: Review output",
    ];
  }

  async generateSprintPlan(): Promise<string[]> {
    return [
      "Sprint Plan: Foundation",
      "Sprint Plan: Features",
      "Sprint Plan: Stabilization",
    ];
  }

  async generateTimeline(): Promise<string[]> {
    return [
      "Timeline: Discovery",
      "Timeline: Build",
      "Timeline: QA and release",
    ];
  }
}
