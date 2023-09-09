import { armyCampSchema } from "@features/armyCamp/lib/types";
import { crafterSchema } from "@features/crafter/lib/types";
import { digSiteSchema } from "@features/digSite/lib/types";
import { hospitalSchema } from "@features/hospital/lib/types";
import { marketSchema } from "@features/market/lib/types";
import { mercenaryCampSchema } from "@features/mercenaryCamp/lib/types";
import { mineSchema } from "@features/mine/lib/types";
import { powerSchema } from "@features/power/lib/types";
import { recipeSchema } from "@features/recipe/lib/types";
import { rewardCacheSchema } from "@features/rewardCache/lib/types";
import { smelterSchema } from "@features/smelter/lib/types";
import { z } from "zod";
import { rewardTypeSchema } from "./enums";
import { mortarSchema } from "@features/mortar/lib/types";
import { arenaSchema } from "@features/arena/lib/types";

export const rewardSchema = z.object({
  Recipe: recipeSchema.nullable(),
  MoneyPerSecond: z.number(),
  Arena: arenaSchema.nullable(),
  ArmyCamp: armyCampSchema.nullable(),
  Cache: rewardCacheSchema.nullable(),
  Crafter: crafterSchema.nullable(),
  DigSite: digSiteSchema.nullable(),
  Hospital: hospitalSchema.nullable(),
  Market: marketSchema.nullable(),
  MercenaryCamp: mercenaryCampSchema.nullable(),
  Mine: mineSchema.nullable(),
  Mortar: mortarSchema.nullable(),
  Power: powerSchema.nullable(),
  Smelter: smelterSchema.nullable(),
  Type: rewardTypeSchema,
  Image: z.string().nullable(),
});
export type Reward = z.infer<typeof rewardSchema>;
