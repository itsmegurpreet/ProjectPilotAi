"use client";

import { use } from "react";
import { EmptyState } from "@/components/states/empty-state";
import { ErrorState } from "@/components/states/error-state";
import { LoadingCards } from "@/components/states/loading-cards";
import { TimelineGantt } from "@/features/timeline/components/timeline-gantt";
import { useTimeline } from "@/hooks/use-timeline";

export default function ProjectTimelinePage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const query = useTimeline(projectId);

  if (query.isLoading) return <LoadingCards />;
  if (query.isError) return <ErrorState onRetry={() => query.refetch()} />;
  if (!query.data?.length) {
    return (
      <EmptyState
        title="No timeline generated"
        description="Generate plan to view milestones and schedule."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Timeline View</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Gantt-style schedule with milestone highlights.
        </p>
      </div>
      <TimelineGantt data={query.data} />
    </div>
  );
}
