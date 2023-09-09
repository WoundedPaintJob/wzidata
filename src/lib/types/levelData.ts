import { arenaSchema } from '@features/arena/lib/types';
import { armyCampSchema, superCampSchema } from '@features/armyCamp/lib/types';
import { bonusSchema } from '@features/bonus/lib/types';
import { crafterSchema } from '@features/crafter/lib/types';
import { digSiteSchema } from '@features/digSite/lib/types';
import { hospitalSchema } from '@features/hospital/lib/types';
import { marketSchema } from '@features/market/lib/types';
import { materialSchema } from '@features/material/lib/types';
import { mercenaryCampSchema } from '@features/mercenaryCamp/lib/types';
import { mineSchema } from '@features/mine/lib/types';
import { mortarSchema } from '@features/mortar/lib/types';
import { powerSchema } from '@features/power/lib/types';
import { recipeSchema } from '@features/recipe/lib/types';
import { rewardCacheSchema } from '@features/rewardCache/lib/types';
import { smelterSchema } from '@features/smelter/lib/types';
import { techSchema } from '@features/tech/lib/types';
import { zoneSchema } from '@features/zone/lib/types';
import { z } from 'zod';

export const levelDataSchema = z.object({
  Name: z.string(),
  Zones: z.array(zoneSchema),
  Bonuses: z.array(bonusSchema),
  Techs: z.array(techSchema),
  Arenas: z.array(arenaSchema),
  ArmyCamps: z.array(armyCampSchema),
  Caches: z.array(rewardCacheSchema),
  Crafters: z.array(crafterSchema),
  DigSites: z.array(digSiteSchema),
  Hospitals: z.array(hospitalSchema),
  Markets: z.array(marketSchema),
  MercenaryCamps: z.array(mercenaryCampSchema),
  Mines: z.array(mineSchema),
  Mortars: z.array(mortarSchema),
  Powers: z.array(powerSchema),
  Recipes: z.array(recipeSchema),
  Smelters: z.array(smelterSchema),
  Materials: z.array(materialSchema),
  LevelRevision: z.number().nullable(),
  SuperCamp: superCampSchema,
});
export type LevelData = z.infer<typeof levelDataSchema>;
