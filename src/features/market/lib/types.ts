import { materialSchema } from '@features/material/lib/types';
import { AssetState, assetSchema } from '@lib/types/assets';
import { z } from 'zod';

export const marketSchema = assetSchema.extend({
  Multiplier: z.number(),
  Materials: z.array(materialSchema),
  BestMaterial: materialSchema,
});
export type Market = z.infer<typeof marketSchema>;
export interface MarketState extends AssetState, Market {}
