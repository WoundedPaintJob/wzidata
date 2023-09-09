import { RenderOptionType } from "@lib/types/enums";

export function propsTypeToString(type: RenderOptionType): string {
  switch (type) {
  case RenderOptionType.Conquered:
    return "Conquered";
  case RenderOptionType.Arena:
    return "Arenas";
  case RenderOptionType.ArmyCamp:
    return "Army camps";
  case RenderOptionType.Crafter:
    return "Crafters";
  case RenderOptionType.Hospital:
    return "Hospitals";
  case RenderOptionType.Market:
    return "Markets";
  case RenderOptionType.MercenaryCamp:
    return "Mercenary camps";
  case RenderOptionType.Mine:
    return "Mines";
  case RenderOptionType.Mortar:
    return "Mortars";
  case RenderOptionType.Smelter:
    return "Smelters";
  case RenderOptionType.CacheArmy:
    return "Army caches";
  case RenderOptionType.CacheMoney:
    return "Money caches";
  case RenderOptionType.CacheResource:
    return "Resource caches";
  case RenderOptionType.BonusZones:
    return "Zones with bonus";
  case RenderOptionType.MostExpensive:
    return "Most expensive";
  case RenderOptionType.Cost:
    return "Cost";
  case RenderOptionType.Recipe:
    return "Recipes";
  case RenderOptionType.DigSite:
    return "DigSites";
  case RenderOptionType.FreeZones:
    return "Free";
  default:
    return "";
  }
}
