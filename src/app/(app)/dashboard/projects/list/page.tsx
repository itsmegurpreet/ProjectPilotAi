"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ErrorState } from "@/components/states/error-state";
import { LoadingCards } from "@/components/states/loading-cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRecentProjects } from "@/hooks/use-dashboard";
import { formatDate } from "@/lib/utils";
import { ProjectCard } from "@/types/project";

function statusVariant(status: ProjectCard["status"]) {
  if (status === "Completed") return "success" as const;
  if (status === "At Risk") return "danger" as const;
  if (status === "Analyzing") return "warning" as const;
  return "default" as const;
}

export default function ProjectsListPage() {
  const [query, setQuery] = useState("");
  const projects = useRecentProjects();

  const filtered = useMemo(() => {
    const all = projects.data || [];
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((project) => project.name.toLowerCase().includes(q));
  }, [projects.data, query]);

  if (projects.isLoading) return <LoadingCards />;
  if (projects.isError) {
    return (
      <ErrorState
        description="Unable to load project list."
        onRetry={() => projects.refetch()}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">All Projects</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            View every project in your workspace and open any project overview.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects">Create Project</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by project name"
              className="pl-9"
            />
          </div>

          <div className="space-y-2">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="flex flex-col gap-2 rounded-xl border border-slate-200 p-3 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{project.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Created {formatDate(project.uploadedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={statusVariant(project.status)}>
                    {project.status}
                  </Badge>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/dashboard/projects/${project.id}`}>View</Link>
                  </Button>
                </div>
              </div>
            ))}

            {!filtered.length ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No projects found for this search.
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
