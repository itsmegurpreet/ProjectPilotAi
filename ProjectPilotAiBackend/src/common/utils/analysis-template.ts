export interface ProjectAnalysisJson {
  summary: string;
  goals: string[];
  modules: string[];
  assumptions: string[];
  dependencies: string[];
  risks: string[];
  milestones: string[];
  wbs: string[];
  sprints: string[];
  timeline: string[];
}

export function getDefaultAnalysisJson(): ProjectAnalysisJson {
  return {
    summary: "",
    goals: [],
    modules: [],
    assumptions: [],
    dependencies: [],
    risks: [],
    milestones: [],
    wbs: [],
    sprints: [],
    timeline: [],
  };
}
