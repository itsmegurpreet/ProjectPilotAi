import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(120),
  }),
});

export const projectIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
