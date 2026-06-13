import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";

export function useReports(projectId: string) {
  return useQuery({
    queryKey: ["reports", projectId],
    queryFn: () => projectService.getReports(projectId),
  });
}
