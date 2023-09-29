import { BonusState } from "@features/bonus/lib/types";
import { rewardSchema } from "@features/reward/lib/types";
import { pointSchema, svgSchema } from "@lib/types/image";
import { z } from "zod";

export const zoneBonusRewardSchema = z.object({
  Arena: z.boolean(),
  ArmyCamp: z.boolean(),
  Hospital: z.boolean(),
  Market: z.boolean(),
  MercenaryCamp: z.boolean(),
  Mine: z.boolean(),
  Mortar: z.boolean(),
  Smelter: z.boolean(),
  ArmyCache: z.boolean(),
  MoneyCache: z.boolean(),
  ResourceCache: z.boolean(),
  DigSite: z.boolean(),
  Recipe: z.boolean(),
  Crafter: z.boolean(),
});
export type BonusRewards = z.infer<typeof zoneBonusRewardSchema>;
export const zoneSchema = z.object({
  Id: z.number(),
  Reward: rewardSchema.required(),
  Name: z.string(),
  Cost: z.number(),
  Svg: svgSchema,
  ConnectedZones: z.array(z.number()),
  StartingZone: z.boolean(),
  Center: pointSchema,
  BonusRewards: zoneBonusRewardSchema,
});
export type Zone = z.infer<typeof zoneSchema>;
export interface ZoneState extends Zone {
  Conquered: boolean;
  IsActive: boolean;
  IsNextToActive: boolean;
  Bonuses: BonusState[];
}

export interface ZoneProps {
  Zones: Map<number, ZoneState>;
}

export interface ZoneSlice extends ZoneProps {
  ConquerZone: (zone: ZoneState) => void;
  ConquerZones: (zones: ZoneState[]) => void;
}
