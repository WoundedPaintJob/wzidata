import { AssetWithLevelState, assetWithLevelSchema } from '@lib/types/assets';
import { z } from 'zod';

export const armyCampSchema = assetWithLevelSchema.extend({
  CampLevel: z.number(),
  BaseLevel: z.number(),
});
export type ArmyCamp = z.infer<typeof armyCampSchema>;
export interface ArmyCampState extends AssetWithLevelState, ArmyCamp {
  SuperCharged: boolean;
}

export const superCampLevelSchema = z.object({
  Cost: z.number(),
  Produced: z.number(),
});

export const superCampSchema = z.object({
  Levels: z.array(superCampLevelSchema),
});

export type SuperCamp = z.infer<typeof superCampSchema>;
export interface SuperCampState extends AssetWithLevelState, SuperCamp {}
