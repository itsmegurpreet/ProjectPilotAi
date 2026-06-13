"use client";

import { use } from "react";
import { EmptyState } from "@/components/states/empty-state";
import { ErrorState } from "@/components/states/error-state";
import { LoadingCards } from "@/components/states/loading-cards";
import { SprintCards } from "@/features/sprints/components/sprint-cards";
import { useSprints } from "@/hooks/use-sprints";

export default function ProjectSprintsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const query = useSprints(projectId);

  if (query.isLoading) return <LoadingCards />;
  if (query.isError) return <ErrorState onRetry={() => query.refetch()} />;
  if (!query.data?.length) {
    return (
      <EmptyState
        title="No sprint plan yet"
        description="Generate analysis to create sprint plans."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Sprint Planning</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Review sprint cards, story points, and task estimates for this
          project.
        </p>
      </div>
      <SprintCards data={query.data} />
    </div>
  );
}
