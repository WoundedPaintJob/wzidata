import { AssetState } from '@lib/types/assets';
import { z } from 'zod';

export const probabilitiesSchema = z.object({
  Poor: z.number().optional(),
  Common: z.number().optional(),
  Uncommon: z.number().optional(),
  Rare: z.number().optional(),
  Epic: z.number().optional(),
  Legendary: z.number().optional(),
  Insane: z.number().optional(),
});
export type Probabilities = z.infer<typeof probabilitiesSchema>;
export const digSiteSchema = z.object({
  Cost: z.number(),
  Hours: z.number(),
  Probabilities: probabilitiesSchema,
  Zone: z.number().nullable(),
  Bonus: z.number().nullable(),
});
export type DigSite = z.infer<typeof digSiteSchema>;

export interface DigSiteState extends AssetState, DigSite {}
