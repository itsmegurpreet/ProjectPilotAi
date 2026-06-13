import { prisma } from "@/config/prisma";

export const dashboardRepository = {
  countProjectsByUser: (userId: string) =>
    prisma.project.count({ where: { userId } }),
  countAnalyzedByUser: (userId: string) =>
    prisma.project.count({
      where: {
        userId,
        status: "ANALYZED",
      },
    }),
  recentProjectsByUser: (userId: string) =>
    prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        status: true,
        updatedAt: true,
        createdAt: true,
      },
    }),
};
