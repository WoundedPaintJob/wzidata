import { z } from 'zod';

export enum RewardType {
  None = 'None',
  Arena = 'Arena',
  ArmyCache = 'ArmyCache',
  ArmyCamp = 'ArmyCamp',
  Crafter = 'Crafter',
  DigSite = 'DigSite',
  Hospital = 'Hospital',
  Market = 'Market',
  MercenaryCamp = 'MercenaryCamp',
  Mine = 'Mine',
  MoneyCache = 'MoneyCache',
  Mortar = 'Mortar',
  Power = 'Power',
  Recipe = 'Recipe',
  ResourceCache = 'ResourceCache',
  Smelter = 'Smelter',
}
export const rewardTypeSchema = z.nativeEnum(RewardType);
