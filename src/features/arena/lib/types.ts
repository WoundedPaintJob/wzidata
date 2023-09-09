import { rewardCacheSchema } from "@features/rewardCache/lib/types";
import { z } from "zod";

export const templateSchema = z.object({
  Id: z.number(),
  Name: z.string(),
});
export const arenaSchema = z.object({
  Reward: rewardCacheSchema,
  Template: templateSchema,
  Zone: z.number().nullable(),
  Bonus: z.number().nullable(),
});
export type Template = z.infer<typeof templateSchema>;
export type Arena = z.infer<typeof arenaSchema>;