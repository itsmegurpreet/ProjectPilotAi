import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorState({
  title = "Something went wrong",
  description = "We could not load the requested data.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-800 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-200">
      <div className="mb-2 flex items-center gap-2 font-semibold">
        <AlertTriangle className="h-4 w-4" />
        {title}
      </div>
      <p className="mb-4 text-sm opacity-90">{description}</p>
      {onRetry ? (
        <Button variant="outline" className="border-rose-300" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
