import { TimelineItem } from "@/types/project";

function toDays(date: string) {
  return Math.floor(new Date(date).getTime() / (1000 * 60 * 60 * 24));
}

export function TimelineGantt({ data }: { data: TimelineItem[] }) {
  const start = Math.min(...data.map((item) => toDays(item.start)));
  const end = Math.max(...data.map((item) => toDays(item.end)));
  const total = Math.max(end - start, 1);

  return (
    <div className="space-y-3">
      {data.map((item) => {
        const left = ((toDays(item.start) - start) / total) * 100;
        const width = ((toDays(item.end) - toDays(item.start)) / total) * 100;

        return (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 p-3 dark:border-slate-700"
          >
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium">{item.module}</span>
              <span className="text-slate-500">
                {item.start} to {item.end}
              </span>
            </div>
            <div className="relative h-4 rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="absolute h-4 rounded-full bg-linear-to-r from-sky-500 to-cyan-400"
                style={{ left: `${left}%`, width: `${Math.max(width, 8)}%` }}
              />
            </div>
            {item.milestone ? (
              <p className="mt-2 text-xs text-amber-600">
                Milestone: {item.milestone}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
