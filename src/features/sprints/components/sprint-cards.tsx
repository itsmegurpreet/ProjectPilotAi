import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprint } from "@/types/project";

export function SprintCards({ data }: { data: Sprint[] }) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {data.map((sprint) => (
        <Card key={sprint.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{sprint.name}</span>
              <span className="text-sm text-slate-500">
                {sprint.storyPoints} pts
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">
              {sprint.goal}
            </p>
            <div className="space-y-2">
              {sprint.tasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-lg bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800"
                >
                  <p className="font-medium">{task.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Estimate: {task.estimateHours}h
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
