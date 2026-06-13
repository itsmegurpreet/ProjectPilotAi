"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ErrorState } from "@/components/states/error-state";
import { LoadingCards } from "@/components/states/loading-cards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MetricsCards } from "@/features/dashboard/components/metrics-cards";
import { RecentProjects } from "@/features/dashboard/components/recent-projects";
import {
  useCreateProject,
  useDashboardMetrics,
  useRecentProjects,
} from "@/hooks/use-dashboard";

const createProjectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters."),
});

type CreateProjectForm = z.infer<typeof createProjectSchema>;

export default function ProjectsPage() {
  const router = useRouter();
  const metrics = useDashboardMetrics();
  const projects = useRecentProjects();
  const createProject = useCreateProject();

  const form = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: { name: "" },
  });

  if (metrics.isLoading || projects.isLoading) return <LoadingCards />;
  if (metrics.isError || projects.isError) {
    return (
      <ErrorState
        description="Unable to load projects."
        onRetry={() => {
          metrics.refetch();
          projects.refetch();
        }}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          After login, create or select a project before uploading and
          generating plans.
        </p>
      </div>

      <MetricsCards metrics={metrics.data!} />

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentProjects projects={projects.data!} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-3"
              onSubmit={form.handleSubmit(async (values) => {
                const project = await createProject.mutateAsync(values);
                router.push(`/dashboard/projects/${project.id}`);
              })}
            >
              <div className="space-y-1.5">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  placeholder="e.g. Smart Inventory Platform"
                  {...form.register("name")}
                />
                {form.formState.errors.name ? (
                  <p className="text-xs text-rose-600">
                    {form.formState.errors.name.message}
                  </p>
                ) : null}
              </div>
              {createProject.isError ? (
                <p className="text-xs text-rose-600">
                  {createProject.error.message}
                </p>
              ) : null}
              <Button type="submit" disabled={createProject.isPending}>
                {createProject.isPending ? "Creating..." : "Create Project"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
