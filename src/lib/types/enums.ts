import { z } from "zod";

export enum AssetType {
  Arena = "Arena",
  ArmyCamp = "ArmyCamp",
  Crafter = "Crafter",
  Hospital = "Hospital",
  Market = "Market",
  MercenaryCamp = "MercenaryCamp",
  Mine = "Mine",
  Mortar = "Mortar",
  Smelter = "Smelter",
}
export const assetTypeSchema = z.nativeEnum(AssetType);
export enum RenderOptionType {
  Conquered,
  Arena,
  ArmyCamp,
  Crafter,
  DigSite,
  Hospital,
  Market,
  MercenaryCamp,
  Mine,
  Mortar,
  Smelter,
  CacheArmy,
  CacheMoney,
  CacheResource,
  Recipe,
  BonusZones,
  MostExpensive,
  Cost,
  FreeZones,
  MoneyPerSecond,
}

export enum Tabs {
  Overview,
  Hospitals,
  Markets,
  ArmyCamps,
  MercenaryCamp,
  Mines,
  DigSite,
  Techs,
  Arenas,
  Mortars,
  Advancements,
  Artifacts,
  Evaluator,
  Guide,
  Levels,
}
