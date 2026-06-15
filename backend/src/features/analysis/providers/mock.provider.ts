import { AIProvider } from "@/features/analysis/ai-provider.interface";
import {
  getDefaultAnalysisJson,
  ProjectAnalysisJson,
} from "@/common/utils/analysis-template";

function splitStatements(input: string) {
  return input
    .split(/\n+|(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 12);
}

function unique(items: string[]) {
  return Array.from(new Set(items.map((item) => item.trim()).filter(Boolean)));
}

function pickByKeywords(
  statements: string[],
  keywords: string[],
  limit: number,
) {
  const matches = statements.filter((statement) => {
    const normalized = statement.toLowerCase();
    return keywords.some((keyword) => normalized.includes(keyword));
  });

  return unique(matches).slice(0, limit);
}

function cleanList(items: string[], fallback: string[], limit: number) {
  const cleaned = unique(
    items.map((item) => item.replace(/^[-*\d.)\s]+/, "").trim()),
  ).slice(0, limit);

  return cleaned.length > 0 ? cleaned : fallback;
}

function deriveModules(input: string) {
  const modules: Array<{ name: string; keywords: string[] }> = [
    { name: "Authentication", keywords: ["auth", "login", "signup", "jwt"] },
    { name: "Project Management", keywords: ["project", "task", "roadmap"] },
    {
      name: "Document Ingestion",
      keywords: ["document", "upload", "pdf", "docx"],
    },
    {
      name: "Analysis Engine",
      keywords: ["analysis", "ai", "summar", "extract"],
    },
    { name: "Reporting", keywords: ["report", "dashboard", "metric", "chart"] },
    { name: "Planning", keywords: ["sprint", "timeline", "milestone", "wbs"] },
    {
      name: "Integrations",
      keywords: ["integration", "webhook", "api", "third-party"],
    },
  ];

  const normalized = input.toLowerCase();

  return modules
    .filter((module) =>
      module.keywords.some((keyword) => normalized.includes(keyword)),
    )
    .map((module) => module.name)
    .slice(0, 7);
}

function summarize(input: string, statements: string[]) {
  const documentCount = (input.match(/^Document:/gm) || []).length;
  const first = statements[0] || "Requirements were extracted and processed.";
  const second =
    statements[1] || "Sections were generated from parsed content.";
  const chars = input.trim().length;

  return `Generated from ${chars} characters across ${Math.max(documentCount, 1)} document(s). ${first} ${second}`;
}

export class MockProvider implements AIProvider {
  async analyzeRequirements(input: string): Promise<ProjectAnalysisJson> {
    const statements = splitStatements(input);
    const modules = deriveModules(input);

    const goals = cleanList(
      pickByKeywords(
        statements,
        ["goal", "objective", "must", "should", "need", "require"],
        6,
      ),
      statements.slice(0, 3),
      6,
    );

    const assumptions = cleanList(
      pickByKeywords(
        statements,
        ["assume", "assuming", "expected", "if ", "provided that"],
        5,
      ),
      ["Stakeholder feedback is provided during implementation."],
      5,
    );

    const dependencies = cleanList(
      pickByKeywords(
        statements,
        [
          "depend",
          "dependency",
          "requires",
          "integration",
          "third-party",
          "api",
        ],
        6,
      ),
      ["External integrations and APIs are available in target environments."],
      6,
    );

    const risks = cleanList(
      pickByKeywords(
        statements,
        ["risk", "blocker", "challenge", "delay", "security", "compliance"],
        6,
      ),
      ["Requirement ambiguity may cause scope and delivery risks."],
      6,
    );

    const milestones = cleanList(
      pickByKeywords(
        statements,
        ["milestone", "phase", "release", "sprint", "week", "delivery"],
        6,
      ),
      [
        "Phase 1: Requirement consolidation",
        "Phase 2: MVP implementation",
        "Phase 3: Validation and release",
      ],
      6,
    );

    const base = getDefaultAnalysisJson();

    return {
      ...base,
      summary: summarize(input, statements),
      goals,
      modules:
        modules.length > 0
          ? modules
          : ["Project Management", "Analysis Engine"],
      assumptions,
      dependencies,
      risks,
      milestones,
      wbs: goals.slice(0, 6).map((goal, index) => `WBS ${index + 1}: ${goal}`),
      sprints: milestones
        .slice(0, 4)
        .map((milestone, index) => `Sprint ${index + 1}: ${milestone}`),
      timeline: milestones
        .slice(0, 4)
        .map((milestone, index) => `Week ${index + 1}: ${milestone}`),
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
