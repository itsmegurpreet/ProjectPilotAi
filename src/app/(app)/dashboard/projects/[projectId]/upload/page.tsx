import { UploadForm } from "@/features/upload/components/upload-form";

export default async function ProjectUploadPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Upload Project Document</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Upload BRD, PRD, or SRS into this project workspace.
        </p>
      </div>
      <UploadForm projectId={projectId} />
    </div>
  );
}
