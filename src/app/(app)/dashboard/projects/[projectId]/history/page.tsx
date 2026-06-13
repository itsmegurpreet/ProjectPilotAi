"use client";

import { use } from "react";
import { EmptyState } from "@/components/states/empty-state";
import { ErrorState } from "@/components/states/error-state";
import { LoadingCards } from "@/components/states/loading-cards";
import { HistoryTable } from "@/features/history/components/history-table";
import { useProjectHistory } from "@/hooks/use-history";

export default function ProjectHistoryPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const query = useProjectHistory(projectId);

  if (query.isLoading) return <LoadingCards />;
  if (query.isError) return <ErrorState onRetry={() => query.refetch()} />;
  if (!query.data?.length) {
    return (
      <EmptyState
        title="No history yet"
        description="Uploaded artifacts will appear here."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Project History</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Browse this project generation history and report stats.
        </p>
      </div>
      <HistoryTable projects={query.data} />
    </div>
  );
}
