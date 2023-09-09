import { BonusState } from "@features/bonus/lib/types";
import { RewardType } from "@features/reward/lib/enums";
import { Reward } from "@features/reward/lib/types";
import { ZoneState } from "@features/zone/lib/types";
import { RenderOptionType } from "@lib/types/enums";
export function getZoneColor(
  zone: ZoneState,
  settings: Map<RenderOptionType, boolean>,
  activeZone: ZoneState,
  activeBonus: BonusState,
  mostExpensive: number,
  hospitalSaves: number,
  partOfPath: boolean
): string {
  const drawBonusZones = settings.get(RenderOptionType.BonusZones);
  if (activeZone && activeZone.Id == zone.Id) return "#39FF14";
  if (
    activeBonus &&
		activeBonus.ZoneIds &&
		activeBonus.ZoneIds.includes(zone.Id)
  )
    return "#39FF14";
  if (settings.get(RenderOptionType.Conquered) && zone.Conquered)
    return "#FFA500";
  if (activeZone && activeZone.ConnectedZones.some((z) => z == zone.Id))
    return "#B0FFA1";
  if (partOfPath) return "#EEDDAA";
  if (settings.get(RenderOptionType.MostExpensive))
    return getColorFromPercentage(zone.Cost / mostExpensive);
  if (settings.get(RenderOptionType.FreeZones) && zone.Cost < hospitalSaves)
    return "#FFAAAA";
  if (drawBonusZones) {
    if (settings.get(RenderOptionType.Arena) && zone.BonusRewards.Arena)
      return "#B384C8";
    if (settings.get(RenderOptionType.ArmyCamp) && zone.BonusRewards.ArmyCamp)
      return "#98FF98";
    if (settings.get(RenderOptionType.CacheArmy) && zone.BonusRewards.ArmyCache)
      return "#E3ADF7";
    if (
      settings.get(RenderOptionType.CacheMoney) &&
			zone.BonusRewards.MoneyCache
    )
      return "#FFC1A1";
    if (
      settings.get(RenderOptionType.CacheResource) &&
			zone.BonusRewards.ResourceCache
    )
      return "#30C7C7";
    if (settings.get(RenderOptionType.Crafter) && zone.BonusRewards.Crafter)
      return "#A565F2";
    if (settings.get(RenderOptionType.DigSite) && zone.BonusRewards.DigSite)
      return "#FFAEC0";
    if (settings.get(RenderOptionType.Hospital) && zone.BonusRewards.Hospital)
      return "#48E5E5";
    if (settings.get(RenderOptionType.Market) && zone.BonusRewards.Market)
      return "#4FA0D8";
    if (
      settings.get(RenderOptionType.MercenaryCamp) &&
			zone.BonusRewards.MercenaryCamp
    )
      return "#D881F8";
    if (settings.get(RenderOptionType.Mine) && zone.BonusRewards.Mine)
      return "#B0E57C";
    if (settings.get(RenderOptionType.Mortar) && zone.BonusRewards.Mortar)
      return "#EEDDAA";
    if (settings.get(RenderOptionType.Recipe) && zone.BonusRewards.Recipe)
      return "#7EF9FF";
    if (settings.get(RenderOptionType.Smelter) && zone.BonusRewards.Smelter)
      return "#B384C8";
  }
  return "#FFF";
}
export function shouldDrawImage(
  reward: Reward,
  settings: Map<RenderOptionType, boolean>
): boolean {
  if (!reward) return false;
  if (
    settings.get(RenderOptionType.CacheArmy) &&
		reward.Type == RewardType.ArmyCache
  )
    return true;
  if (
    settings.get(RenderOptionType.CacheMoney) &&
		reward.Type == RewardType.MoneyCache
  )
    return true;
  if (
    settings.get(RenderOptionType.CacheResource) &&
		reward.Type == RewardType.ResourceCache
  )
    return true;
  if (settings.get(RenderOptionType.ArmyCamp) && reward.ArmyCamp) return true;
  if (settings.get(RenderOptionType.Arena) && reward.Arena) return true;
  if (settings.get(RenderOptionType.Crafter) && reward.Crafter) return true;
  if (settings.get(RenderOptionType.DigSite) && reward.DigSite) return true;
  if (settings.get(RenderOptionType.Hospital) && reward.Hospital) return true;
  if (settings.get(RenderOptionType.Market) && reward.Market) return true;
  if (settings.get(RenderOptionType.MercenaryCamp) && reward.MercenaryCamp)
    return true;
  if (settings.get(RenderOptionType.Mine) && reward.Mine) return true;
  if (settings.get(RenderOptionType.Mortar) && reward.Mortar) return true;
  if (settings.get(RenderOptionType.Recipe) && reward.Recipe) return true;
  if (settings.get(RenderOptionType.Smelter) && reward.Smelter) return true;

  return false;
}
function getColorFromPercentage(percentage: number): string {
  // Clamp the percentage between 0 and 1
  percentage = Math.max(0, Math.min(1, percentage));

  // Calculate the color values
  const r = Math.round(255 * percentage + 255 * (1 - percentage));
  const g = Math.round(255 * (1 - percentage));
  const b = g;

  // Convert to hex
  const rHex = r.toString(16).padStart(2, "0");
  const gHex = g.toString(16).padStart(2, "0");
  const bHex = b.toString(16).padStart(2, "0");

  // Return the color as hex
  return `#${rHex}${gHex}${bHex}`;
}
