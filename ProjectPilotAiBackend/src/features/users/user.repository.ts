import { prisma } from "@/config/prisma";

export const userRepository = {
  findById: (id: string) =>
    prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, createdAt: true },
    }),
};
