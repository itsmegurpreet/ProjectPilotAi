import { dashboardRepository } from "@/features/dashboard/dashboard.repository";

export const dashboardService = {
  async getStats(userId: string) {
    const [totalProjects, analyzedProjects, recentProjects] = await Promise.all(
      [
        dashboardRepository.countProjectsByUser(userId),
        dashboardRepository.countAnalyzedByUser(userId),
        dashboardRepository.recentProjectsByUser(userId),
      ],
    );

    return {
      totalProjects,
      analyzedProjects,
      pendingAnalysis: Math.max(totalProjects - analyzedProjects, 0),
      recentProjects,
    };
  },
};
