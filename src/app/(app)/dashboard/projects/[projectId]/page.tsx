"use client";

import { use, useMemo, useState } from "react";
import { Calculator, Server, Users } from "lucide-react";
import { EmptyState } from "@/components/states/empty-state";
import { ErrorState } from "@/components/states/error-state";
import { LoadingCards } from "@/components/states/loading-cards";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAnalysis } from "@/hooks/use-analysis";
import { useTimeline } from "@/hooks/use-timeline";
import { useWbs } from "@/hooks/use-wbs";
import { WbsNode } from "@/types/project";

interface TaskRow {
  title: string;
  estimateHours: number;
}

interface ResourceRow {
  role: string;
  count: number;
  hoursPerPerson: number;
  ratePerHour: number;
}

interface InfraRow {
  name: string;
  reason: string;
  monthlyCost: number;
}

function flattenWbs(nodes: WbsNode[]): TaskRow[] {
  const tasks: TaskRow[] = [];

  const visit = (node: WbsNode) => {
    tasks.push({
      title: node.title,
      estimateHours: node.estimateHours || 8,
    });

    (node.children || []).forEach(visit);
  };

  nodes.forEach(visit);
  return tasks;
}

function buildResources(modules: string[], totalHours: number): ResourceRow[] {
  const averageHours = Math.max(20, Math.ceil(totalHours / 3));
  const normalized = modules.map((module) => module.toLowerCase());

  const rows: ResourceRow[] = [
    {
      role: "Project Manager",
      count: 1,
      hoursPerPerson: averageHours,
      ratePerHour: 60,
    },
    {
      role: "Backend Engineer",
      count: 1,
      hoursPerPerson: averageHours,
      ratePerHour: 55,
    },
  ];

  if (normalized.some((module) => module.includes("auth"))) {
    rows.push({
      role: "Security Engineer",
      count: 1,
      hoursPerPerson: Math.max(12, Math.floor(averageHours * 0.6)),
      ratePerHour: 70,
    });
  }

  if (
    normalized.some(
      (module) => module.includes("analysis") || module.includes("ai"),
    )
  ) {
    rows.push({
      role: "AI Engineer",
      count: 1,
      hoursPerPerson: Math.max(16, Math.floor(averageHours * 0.8)),
      ratePerHour: 80,
    });
  }

  if (
    normalized.some(
      (module) =>
        module.includes("frontend") ||
        module.includes("report") ||
        module.includes("dashboard"),
    )
  ) {
    rows.push({
      role: "Frontend Engineer",
      count: 1,
      hoursPerPerson: Math.max(16, Math.floor(averageHours * 0.8)),
      ratePerHour: 50,
    });
  }

  return rows;
}

function buildInfraRequirements(
  modules: string[],
  dependencies: string[],
): InfraRow[] {
  const normalized = [...modules, ...dependencies].join(" ").toLowerCase();

  const infra: InfraRow[] = [
    {
      name: "Application Hosting",
      reason: "Run frontend and backend workloads",
      monthlyCost: 40,
    },
    {
      name: "Managed Database",
      reason: "Persist projects, analyses, and metadata",
      monthlyCost: 55,
    },
    {
      name: "Object Storage",
      reason: "Store uploaded documents and generated artifacts",
      monthlyCost: 20,
    },
    {
      name: "Monitoring and Logs",
      reason: "Track errors, performance, and uptime",
      monthlyCost: 25,
    },
  ];

  if (
    normalized.includes("ai") ||
    normalized.includes("openai") ||
    normalized.includes("model")
  ) {
    infra.push({
      name: "AI Inference API Budget",
      reason: "Token consumption for requirement analysis",
      monthlyCost: 100,
    });
  }

  return infra;
}

export default function ProjectWorkspacePage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const analysis = useAnalysis(projectId);
  const wbs = useWbs(projectId);
  const timeline = useTimeline(projectId);

  const [hourlyRate, setHourlyRate] = useState(55);
  const [contingencyPercent, setContingencyPercent] = useState(15);

  const analysisData = analysis.data;

  const tasks = useMemo(
    () => flattenWbs(wbs.data || []).slice(0, 12),
    [wbs.data],
  );
  const totalTaskHours = tasks.reduce(
    (sum, task) => sum + task.estimateHours,
    0,
  );

  const resources = useMemo(
    () => buildResources(analysisData?.modules || [], totalTaskHours),
    [analysisData?.modules, totalTaskHours],
  );

  const infra = useMemo(
    () =>
      buildInfraRequirements(
        analysisData?.modules || [],
        analysisData?.dependencies || [],
      ),
    [analysisData?.dependencies, analysisData?.modules],
  );

  if (analysis.isLoading || wbs.isLoading || timeline.isLoading) {
    return <LoadingCards />;
  }

  if (analysis.isError || wbs.isError || timeline.isError) {
    return (
      <ErrorState
        description="Unable to load project overview."
        onRetry={() => {
          analysis.refetch();
          wbs.refetch();
          timeline.refetch();
        }}
      />
    );
  }

  if (!analysisData) {
    return (
      <EmptyState
        title="No analysis found"
        description="Upload documents and run analysis to generate a project overview."
      />
    );
  }

  const resourceCost = resources.reduce(
    (sum, row) => sum + row.count * row.hoursPerPerson * row.ratePerHour,
    0,
  );
  const laborCost = totalTaskHours * hourlyRate;
  const infraCost = infra.reduce((sum, row) => sum + row.monthlyCost, 0);
  const contingencyCost = Math.round(
    ((laborCost + resourceCost) * contingencyPercent) / 100,
  );
  const totalEstimate = laborCost + resourceCost + infraCost + contingencyCost;
  const estimatedDurationWeeks = Math.max(
    timeline.data?.length || 0,
    Math.ceil(Math.max(totalTaskHours, 1) / 40),
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Project Overview</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Summary, task plan, cost estimation, resource mix, and infrastructure
          recommendations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {analysisData.summary}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {analysisData.modules.map((module) => (
              <Badge key={module} variant="default">
                {module}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <div
                key={`${task.title}-${index}`}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
              >
                <span>{task.title}</span>
                <span className="text-slate-500 dark:text-slate-400">
                  {task.estimateHours}h
                </span>
              </div>
            ))}
          </div>
          <p className="pt-2 text-xs text-slate-500 dark:text-slate-400">
            Total planned effort: {totalTaskHours} hours
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Cost Calculator and Estimation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Blended hourly rate (USD)
              </p>
              <Input
                type="number"
                min={10}
                value={hourlyRate}
                onChange={(event) =>
                  setHourlyRate(Number(event.target.value || 0))
                }
              />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Contingency (%)
              </p>
              <Input
                type="number"
                min={0}
                max={50}
                value={contingencyPercent}
                onChange={(event) =>
                  setContingencyPercent(Number(event.target.value || 0))
                }
              />
            </div>
          </div>

          <div className="grid gap-2 pt-2 text-sm sm:grid-cols-2">
            <p>
              Labor cost: <strong>${laborCost.toLocaleString()}</strong>
            </p>
            <p>
              Resource cost: <strong>${resourceCost.toLocaleString()}</strong>
            </p>
            <p>
              Infra monthly: <strong>${infraCost.toLocaleString()}</strong>
            </p>
            <p>
              Contingency: <strong>${contingencyCost.toLocaleString()}</strong>
            </p>
            <p>
              Estimated duration:{" "}
              <strong>{estimatedDurationWeeks} weeks</strong>
            </p>
            <p>
              Total estimate: <strong>${totalEstimate.toLocaleString()}</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Resources Required with Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {resources.map((resource) => {
                const rowCost =
                  resource.count *
                  resource.hoursPerPerson *
                  resource.ratePerHour;
                return (
                  <div
                    key={resource.role}
                    className="rounded-lg border border-slate-200 p-3 dark:border-slate-700"
                  >
                    <p className="font-medium">{resource.role}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {resource.count} x {resource.hoursPerPerson}h x $
                      {resource.ratePerHour}/h
                    </p>
                    <p className="pt-1 text-sm">
                      Cost: ${rowCost.toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              Infrastructure Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {infra.map((row) => (
                <div
                  key={row.name}
                  className="rounded-lg border border-slate-200 p-3 dark:border-slate-700"
                >
                  <p className="font-medium">{row.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {row.reason}
                  </p>
                  <p className="pt-1">
                    Estimated monthly: ${row.monthlyCost.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
