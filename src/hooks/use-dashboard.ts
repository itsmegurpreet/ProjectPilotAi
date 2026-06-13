import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";
import { CreateProjectInput } from "@/types/project";

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: projectService.getDashboardMetrics,
  });
}

export function useRecentProjects() {
  return useQuery({
    queryKey: ["recent-projects"],
    queryFn: projectService.getRecentProjects,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProjectInput) =>
      projectService.createProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recent-projects"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-metrics"] });
    },
  });
}
