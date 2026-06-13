import { z } from "zod";

export const projectIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
