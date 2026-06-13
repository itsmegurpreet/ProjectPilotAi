"use client";

import { use } from "react";
import { ReportsCharts } from "@/components/charts/reports-charts";
import { EmptyState } from "@/components/states/empty-state";
import { ErrorState } from "@/components/states/error-state";
import { LoadingCards } from "@/components/states/loading-cards";
import { useReports } from "@/hooks/use-reports";

export default function ProjectReportsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const query = useReports(projectId);

  if (query.isLoading) return <LoadingCards />;
  if (query.isError) return <ErrorState onRetry={() => query.refetch()} />;
  if (!query.data) {
    return (
      <EmptyState
        title="No charts available"
        description="Run analysis to generate reports."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Reports & Charts</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Visualize effort, sprint split, risks, and milestone progress for this
          project.
        </p>
      </div>
      <ReportsCharts data={query.data} />
    </div>
  );
}
