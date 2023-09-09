import { AssetWithLevelState, assetWithLevelSchema } from "@lib/types/assets";
import { z } from "zod";

export const mortarNearbySchema = z.object({
  ZoneId: z.number(),
  Distance: z.number(),
});

export const mortarSchema = assetWithLevelSchema.extend({
  NearbyZones: z.array(mortarNearbySchema),
});
export type MortarNearbyZone = z.infer<typeof mortarNearbySchema>;
export type Mortar = z.infer<typeof mortarSchema>;
export interface MortarState extends AssetWithLevelState, Mortar {}
