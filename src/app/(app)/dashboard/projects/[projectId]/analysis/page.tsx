"use client";

import { use } from "react";
import { AnalysisSections } from "@/features/analysis/components/analysis-sections";
import { ErrorState } from "@/components/states/error-state";
import { LoadingCards } from "@/components/states/loading-cards";
import { useAnalysis } from "@/hooks/use-analysis";

export default function ProjectAnalysisPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const query = useAnalysis(projectId);

  if (query.isLoading) return <LoadingCards />;
  if (query.isError) return <ErrorState onRetry={() => query.refetch()} />;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Analysis Results</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          AI extracted summary, goals, dependencies, risks, and milestones for
          this project.
        </p>
      </div>
      <AnalysisSections data={query.data!} />
    </div>
  );
}
