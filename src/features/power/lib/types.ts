import { z } from 'zod';

export enum PowerType {
  AdvanceTimeHour = 'AdvanceTimeHour',
  SuperchargeArmyCamp = 'SuperchargeArmyCamp5m',
  SuperchargeMine = 'SuperchargeMine5m',
  FreeCache = 'FreeCache',
  MarketRaid = 'MarketRaid50',
  RemoveFog = 'RemoveFog25',
  InspireMercenaries = 'InspireMercenaries',
  SkipLevel = 'SkipLevel',
  MultiLevel = 'MultiLevel',
}
export const powerTypeSchema = z.nativeEnum(PowerType);

export const powerSchema = z.object({
  Type: powerTypeSchema,
});
export type Power = z.infer<typeof powerSchema>;
