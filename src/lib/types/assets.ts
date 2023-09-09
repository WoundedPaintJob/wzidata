import { z } from 'zod';
import { assetTypeSchema } from './enums';
export const assetSchema = z.object({
  Name: z.string(),
  Index: z.number(),
  Type: assetTypeSchema,
  Zone: z.number().nullable(),
  Bonus: z.number().nullable(),
});
export type Asset = z.infer<typeof assetSchema>;
export const assetWithLevelSchema = assetSchema.extend({
  Level: z.number(),
  UpgradeCosts: z.array(z.number()),
});

export type AssetWithLevel = z.infer<typeof assetWithLevelSchema>;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AssetState extends Asset {}
export interface AssetWithLevelState extends AssetState, AssetWithLevel {}
