import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";

export function useAnalysis(projectId: string) {
  return useQuery({
    queryKey: ["analysis", projectId],
    queryFn: () => projectService.getAnalysisResult(projectId),
  });
}
