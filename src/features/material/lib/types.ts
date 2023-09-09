import { BonusState } from '@features/bonus/lib/types';
import { materialKindSchema, materialTypeSchema } from './enums';
import { ZoneState } from '@features/zone/lib/types';
import { z } from 'zod';
import { Recipe } from '@features/recipe/lib/types';

export const materialSchema = z.object({
  Type: materialTypeSchema,
  Kind: materialKindSchema,
  Name: z.string(),
  Amount: z.number(),
  Cost: z.number(),
  Multiplier: z.number(),
  Image: z.string(),
});
export type Material = z.infer<typeof materialSchema>;

export interface MaterialState extends Material {
  TotalOnMap: number;
  MineBonuses: Map<BonusState, number>;
  MineZones: Map<ZoneState, number>;
  CacheBonuses: Map<BonusState, number>;
  CacheZones: Map<ZoneState, number>;
  RecipeZone: ZoneState;
  RecipeBonus: BonusState;
  Recipe: Recipe;
  Produces: Recipe[];
}
