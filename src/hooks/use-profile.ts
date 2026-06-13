import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: projectService.getUserProfile,
  });
}
