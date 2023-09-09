import { BonusState } from '@features/bonus/lib/types';
import { ZoneState } from '@features/zone/lib/types';
import { AssetState, AssetWithLevelState } from '@lib/types/assets';

export function canLevelUp(asset: AssetWithLevelState): boolean {
  return asset.Level <= asset.UpgradeCosts.length;
}
export function canLevelDown(asset: AssetWithLevelState): boolean {
  return asset.Level > 1;
}
export function getAssetUpgradeCost(
  asset: AssetWithLevelState,
  level?: number
) {
  const l = (level || asset.Level) - 1;
  return asset.UpgradeCosts[l];
}
export function getAffectedAssets(
  assets: AssetState[],
  zoneId: ZoneState,
  bonusId: BonusState
): AssetState[] {
  if (zoneId !== undefined)
    return assets.filter((a) => a.Zone && a.Zone == zoneId.Id);
  if (bonusId !== undefined)
    return assets.filter((a) => a.Bonus && a.Bonus == bonusId.Id);
  return assets;
}
export function isAssetConquered(
  asset: AssetState,
  zones: Map<number, ZoneState>,
  bonuses: Map<number, BonusState>
) {
  if (asset.Zone && zones.get(asset.Zone).Conquered) return true;
  if (asset.Bonus && bonuses.get(asset.Bonus).Conquered) return true;
  return false;
}
