import { AssetWithLevelState, assetWithLevelSchema } from '@lib/types/assets';
import { z } from 'zod';

export const hospitalSchema = assetWithLevelSchema.extend({
  BaseArmiesSaved: z.number(),
  NearbyZones: z.array(z.number()),
});
export type Hospital = z.infer<typeof hospitalSchema>;
export interface HospitalState extends AssetWithLevelState, Hospital {}
