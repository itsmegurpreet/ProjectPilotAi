import { z } from "zod";

export const dashboardStatsSchema = z.object({
  query: z.object({}).optional(),
  body: z.object({}).optional(),
  params: z.object({}).optional(),
});
