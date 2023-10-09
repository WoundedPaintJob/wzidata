import { z } from "zod";
import { levelRewardTypeSchema } from "./enums";
import { materialSchema } from "@features/material/lib/types";
export const levelRewardSchema = z.object({
  Description: z.string().nullable(),
  MaxTime: z.number().optional(),
  Ore: materialSchema.optional(),
  Type: levelRewardTypeSchema,
  AP: z.number(),
});
export const levelInfoSchema = z.object({
  Name: z.string(),
  Id: z.number(),
  HaveData: z.boolean(),
  ImageWidth: z.number(),
  ImageHeight: z.number(),
  IsHardened: z.boolean(),
  Reward: levelRewardSchema.optional(),
});
export type LevelInfo = z.infer<typeof levelInfoSchema>;
