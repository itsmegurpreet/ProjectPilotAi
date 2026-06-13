import { useMutation } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";

export function useUploadDocument() {
  return useMutation({
    mutationFn: ({ projectId, file }: { projectId: string; file: File }) =>
      projectService.uploadProjectDocument(projectId, file),
  });
}
