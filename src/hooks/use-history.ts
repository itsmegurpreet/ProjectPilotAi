import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";

export function useProjectHistory(projectId: string) {
  return useQuery({
    queryKey: ["history", projectId],
    queryFn: () => projectService.getProjectHistory(projectId),
  });
}
