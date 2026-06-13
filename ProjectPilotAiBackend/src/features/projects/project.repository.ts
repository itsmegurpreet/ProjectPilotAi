import { prisma } from "@/config/prisma";

export const projectRepository = {
  create: (userId: string, name: string) =>
    prisma.project.create({
      data: {
        userId,
        name,
      },
    }),

  findManyByUserId: (userId: string) =>
    prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),

  findByIdAndUserId: (id: string, userId: string) =>
    prisma.project.findFirst({
      where: { id, userId },
    }),

  deleteById: (id: string) =>
    prisma.project.delete({
      where: { id },
    }),

  update: (id: string, data: Record<string, unknown>) =>
    prisma.project.update({
      where: { id },
      data,
    }),
};
