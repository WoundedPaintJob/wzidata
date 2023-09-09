import { assetSchema, AssetState } from '@lib/types/assets';
import { z } from 'zod';

export const mercenaryCampSchema = assetSchema.extend({
  CostPerArmy: z.number(),
  ArmiesLeft: z.number(),
});
export type MercenaryCamp = z.infer<typeof mercenaryCampSchema>;

export interface MercenaryCampState extends AssetState, MercenaryCamp {}
