import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";

export function useSprints(projectId: string) {
  return useQuery({
    queryKey: ["sprints", projectId],
    queryFn: () => projectService.getSprints(projectId),
  });
}
