import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ProjectCard } from "@/types/project";

export function HistoryTable({ projects }: { projects: ProjectCard[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                <th className="py-3">Project</th>
                <th className="py-3">Uploaded</th>
                <th className="py-3">Reports</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-slate-100 dark:border-slate-800"
                >
                  <td className="py-3">{project.name}</td>
                  <td className="py-3">{formatDate(project.uploadedAt)}</td>
                  <td className="py-3">{project.generatedReports}</td>
                  <td className="py-3">
                    <Badge
                      variant={
                        project.status === "At Risk" ? "danger" : "default"
                      }
                    >
                      {project.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
