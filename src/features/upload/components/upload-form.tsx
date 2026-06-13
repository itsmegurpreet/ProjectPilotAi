"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";
import { useUploadDocument } from "@/hooks/use-upload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const allowedTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function UploadForm({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const upload = useUploadDocument();

  const error = useMemo(() => {
    if (!file) return null;
    if (!allowedTypes.includes(file.type))
      return "Only PDF or DOCX files are supported.";
    if (file.size > 10 * 1024 * 1024) return "File size must be under 10MB.";
    return null;
  }, [file]);

  const onUpload = async () => {
    if (!file || error) return;
    setProgress(15);
    const timer = window.setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + 15));
    }, 220);

    try {
      await upload.mutateAsync({ projectId, file });
      setProgress(100);
      router.push(`/dashboard/projects/${projectId}/analysis`);
    } finally {
      window.clearInterval(timer);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Project Document</CardTitle>
        <CardDescription>
          Drag and drop your BRD, PRD, or SRS document.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-10 text-center transition hover:border-sky-500 dark:border-slate-700 dark:hover:border-sky-400">
          <UploadCloud className="mb-3 h-7 w-7 text-sky-600" />
          <p className="font-medium">Drop file here or click to browse</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            PDF or DOCX, max 10MB
          </p>
          <input
            className="hidden"
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
        </label>

        {file ? (
          <div className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700">
            <p className="font-medium">{file.name}</p>
            <p className="text-slate-500 dark:text-slate-400">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        ) : null}

        {error ? <p className="text-sm text-rose-600">{error}</p> : null}

        {upload.isPending || progress > 0 ? (
          <Progress value={progress} />
        ) : null}
        {upload.isSuccess ? (
          <p className="text-sm text-emerald-600">
            Document uploaded successfully.
          </p>
        ) : null}
        {upload.isError ? (
          <p className="text-sm text-rose-600">{upload.error.message}</p>
        ) : null}

        <Button
          onClick={onUpload}
          disabled={!file || Boolean(error) || upload.isPending}
        >
          {upload.isPending ? "Uploading..." : "Upload and Analyze"}
        </Button>
      </CardContent>
    </Card>
  );
}
