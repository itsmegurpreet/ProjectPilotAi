import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";

export function useWbs(projectId: string) {
  return useQuery({
    queryKey: ["wbs", projectId],
    queryFn: () => projectService.getWbs(projectId),
  });
}
