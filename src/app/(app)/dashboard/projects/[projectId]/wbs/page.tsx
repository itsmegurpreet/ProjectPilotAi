"use client";

import { use } from "react";
import { EmptyState } from "@/components/states/empty-state";
import { ErrorState } from "@/components/states/error-state";
import { LoadingCards } from "@/components/states/loading-cards";
import { useWbs } from "@/hooks/use-wbs";
import { WbsTree } from "@/features/wbs/components/wbs-tree";

export default function ProjectWbsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const query = useWbs(projectId);

  if (query.isLoading) return <LoadingCards />;
  if (query.isError) return <ErrorState onRetry={() => query.refetch()} />;
  if (!query.data?.length) {
    return (
      <EmptyState
        title="No work breakdown available"
        description="Upload a document to generate WBS."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">WBS View</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Explore this project task hierarchy with expandable nodes and search.
        </p>
      </div>
      <WbsTree data={query.data} />
    </div>
  );
}
