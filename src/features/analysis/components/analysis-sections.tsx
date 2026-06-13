import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnalysisResult } from "@/types/project";

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800"
            >
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function AnalysisSections({ data }: { data: AnalysisResult }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Project Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            {data.summary}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <ListCard title="Goals" items={data.goals} />
        <ListCard title="Modules" items={data.modules} />
        <ListCard title="Assumptions" items={data.assumptions} />
        <ListCard title="Dependencies" items={data.dependencies} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data.risks.map((risk) => (
              <div
                key={risk.name}
                className="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800"
              >
                <span>{risk.name}</span>
                <span className="font-semibold">{risk.impact}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.milestones.map((milestone) => (
              <div
                key={milestone.name}
                className="space-y-1 rounded-lg border border-slate-200 p-3 dark:border-slate-700"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{milestone.name}</span>
                  <span>{milestone.date}</span>
                </div>
                <Progress value={milestone.progress} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
