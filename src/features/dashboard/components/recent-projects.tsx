import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ProjectCard } from "@/types/project";

function statusVariant(status: ProjectCard["status"]) {
  if (status === "Completed") return "success" as const;
  if (status === "At Risk") return "danger" as const;
  if (status === "Analyzing") return "warning" as const;
  return "default" as const;
}

export function RecentProjects({ projects }: { projects: ProjectCard[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col gap-2 rounded-xl border border-slate-200 p-3 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{project.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Uploaded {formatDate(project.uploadedAt)} • Reports{" "}
                  {project.generatedReports}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={statusVariant(project.status)}>
                  {project.status}
                </Badge>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/dashboard/projects/${project.id}`}>Open</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
