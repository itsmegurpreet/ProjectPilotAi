import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";

export function useTimeline(projectId: string) {
  return useQuery({
    queryKey: ["timeline", projectId],
    queryFn: () => projectService.getTimeline(projectId),
  });
}
