import { BarChart3, FolderKanban, Radar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricsCards({
  metrics,
}: {
  metrics: {
    totalProjects: number;
    activeProjects: number;
    generatedReports: number;
  };
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-slate-500">
            Total Projects
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-2xl font-semibold">{metrics.totalProjects}</p>
          <FolderKanban className="h-5 w-5 text-sky-600" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-slate-500">
            Active Status
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-2xl font-semibold">{metrics.activeProjects}</p>
          <TrendingUp className="h-5 w-5 text-emerald-600" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-slate-500">
            Generated Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-2xl font-semibold">{metrics.generatedReports}</p>
          <BarChart3 className="h-5 w-5 text-amber-500" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-slate-500">
            Planning Confidence
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-2xl font-semibold">88%</p>
          <Radar className="h-5 w-5 text-violet-500" />
        </CardContent>
      </Card>
    </div>
  );
}
