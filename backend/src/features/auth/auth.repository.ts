import { prisma } from "@/config/prisma";

export const authRepository = {
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  createUser: (email: string, password: string, name: string) =>
    prisma.user.create({
      data: { email, password, name },
    }),
};
