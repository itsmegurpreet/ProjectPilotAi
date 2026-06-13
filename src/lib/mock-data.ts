import {
  AnalysisResult,
  ProjectCard,
  ReportsData,
  Sprint,
  TimelineItem,
  UserProfile,
  WbsNode,
} from "@/types/project";

export const projects: ProjectCard[] = [
  {
    id: "p-101",
    name: "Supply Chain Optimization Platform",
    status: "In Planning",
    uploadedAt: "2026-06-09",
    generatedReports: 6,
  },
  {
    id: "p-102",
    name: "Telehealth Mobile Revamp",
    status: "Analyzing",
    uploadedAt: "2026-06-11",
    generatedReports: 2,
  },
  {
    id: "p-103",
    name: "Fintech Onboarding Automation",
    status: "At Risk",
    uploadedAt: "2026-06-05",
    generatedReports: 8,
  },
];

export const analysisResult: AnalysisResult = {
  projectId: "p-101",
  summary:
    "ProjectPilot AI identified a multi-phase delivery roadmap for a cloud-native supply chain analytics platform with real-time demand forecasting and procurement optimization.",
  goals: [
    "Reduce procurement cycle time by 30%",
    "Improve forecast accuracy to 92%",
    "Enable role-based analytics for operations teams",
  ],
  modules: [
    "Data Ingestion",
    "Forecasting Engine",
    "Procurement Automation",
    "Vendor Portal",
    "Admin & Reporting",
  ],
  assumptions: [
    "ERP data access is available via secure APIs",
    "Stakeholders can validate module outputs every sprint",
    "Historical demand data has fewer than 5% missing fields",
  ],
  dependencies: [
    "ERP Integration Team",
    "Cloud Infrastructure Provisioning",
    "Security Review Board",
  ],
  risks: [
    { name: "Delayed API contracts", impact: "High" },
    { name: "Data quality inconsistencies", impact: "Medium" },
    { name: "Cross-team review bottlenecks", impact: "Medium" },
  ],
  milestones: [
    { name: "Requirements Baseline", date: "2026-06-20", progress: 100 },
    { name: "Architecture Signoff", date: "2026-07-02", progress: 75 },
    { name: "Sprint 1 Delivery", date: "2026-07-25", progress: 35 },
    { name: "Pilot Release", date: "2026-08-28", progress: 10 },
  ],
};

export const wbs: WbsNode[] = [
  {
    id: "1",
    title: "Project Initiation",
    estimateHours: 48,
    children: [
      { id: "1.1", title: "Kickoff and Scope Alignment", estimateHours: 16 },
      { id: "1.2", title: "Stakeholder Mapping", estimateHours: 12 },
      { id: "1.3", title: "Environment Setup", estimateHours: 20 },
    ],
  },
  {
    id: "2",
    title: "Core Platform Development",
    estimateHours: 220,
    children: [
      { id: "2.1", title: "Ingestion Pipelines", estimateHours: 64 },
      { id: "2.2", title: "Forecasting Models", estimateHours: 72 },
      { id: "2.3", title: "Workflow Automation", estimateHours: 84 },
    ],
  },
  {
    id: "3",
    title: "Testing and Release",
    estimateHours: 96,
    children: [
      { id: "3.1", title: "Integration Testing", estimateHours: 40 },
      { id: "3.2", title: "UAT and Feedback", estimateHours: 32 },
      { id: "3.3", title: "Production Readiness", estimateHours: 24 },
    ],
  },
];

export const sprints: Sprint[] = [
  {
    id: "sp-1",
    name: "Sprint 1",
    goal: "Establish ingestion and baseline forecasting.",
    storyPoints: 34,
    tasks: [
      { id: "t-1", title: "Build source connectors", estimateHours: 14 },
      { id: "t-2", title: "Define forecasting schema", estimateHours: 10 },
      { id: "t-3", title: "Implement metrics dashboard", estimateHours: 18 },
    ],
  },
  {
    id: "sp-2",
    name: "Sprint 2",
    goal: "Deliver automation workflow and risk controls.",
    storyPoints: 42,
    tasks: [
      { id: "t-4", title: "Automate approval stages", estimateHours: 20 },
      { id: "t-5", title: "Add exception handling", estimateHours: 16 },
      { id: "t-6", title: "Implement audit trail", estimateHours: 12 },
    ],
  },
  {
    id: "sp-3",
    name: "Sprint 3",
    goal: "Ship reporting suite and prepare pilot release.",
    storyPoints: 30,
    tasks: [
      { id: "t-7", title: "Create executive report views", estimateHours: 16 },
      { id: "t-8", title: "Pilot readiness checks", estimateHours: 14 },
    ],
  },
];

export const timeline: TimelineItem[] = [
  {
    id: "tl-1",
    module: "Ingestion",
    start: "2026-06-18",
    end: "2026-07-02",
    milestone: "Data contract frozen",
  },
  {
    id: "tl-2",
    module: "Forecasting",
    start: "2026-06-26",
    end: "2026-07-18",
  },
  {
    id: "tl-3",
    module: "Automation",
    start: "2026-07-10",
    end: "2026-08-01",
    milestone: "Workflow validation",
  },
  {
    id: "tl-4",
    module: "Reporting",
    start: "2026-07-20",
    end: "2026-08-20",
    milestone: "Pilot analytics release",
  },
];

export const reports: ReportsData = {
  effortByModule: [
    { module: "Ingestion", effort: 80 },
    { module: "Forecasting", effort: 120 },
    { module: "Automation", effort: 98 },
    { module: "Reporting", effort: 65 },
  ],
  sprintDistribution: [
    { sprint: "Sprint 1", points: 34 },
    { sprint: "Sprint 2", points: 42 },
    { sprint: "Sprint 3", points: 30 },
  ],
  riskDistribution: [
    { name: "High", value: 2 },
    { name: "Medium", value: 4 },
    { name: "Low", value: 3 },
  ],
  milestoneProgress: [
    { milestone: "Baseline", progress: 100 },
    { milestone: "Architecture", progress: 75 },
    { milestone: "Sprint 1", progress: 35 },
    { milestone: "Pilot", progress: 10 },
  ],
};

export const profile: UserProfile = {
  name: "Ava Bennett",
  email: "ava.bennett@projectpilot.ai",
  role: "Program Manager",
  timezone: "America/New_York",
  notifications: true,
};
