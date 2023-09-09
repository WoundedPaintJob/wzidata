import { BonusState } from "@features/bonus/lib/types";
import { ZoneState } from "@features/zone/lib/types";
import { Reward } from "@features/reward/lib/types";

export function getBiggestCache(bigComparer: (reward1: Reward, reward2: Reward) => boolean, zones: ZoneState[], bonuses: BonusState[]) {
  let biggestCacheZone: ZoneState = null;
  if (zones.length > 0) {
    zones.forEach((zone) => {
      if (biggestCacheZone == null || bigComparer(zone.Reward, biggestCacheZone.Reward))
        biggestCacheZone = zone;
    })
  }
  let biggestCacheBonus: BonusState = null;
  if (bonuses.length > 0) {
    bonuses.forEach((bonus) => {
      if (biggestCacheBonus == null || bigComparer(bonus.Reward, biggestCacheBonus.Reward))
        biggestCacheBonus = bonus;
    })
  }
  if (biggestCacheZone != null && biggestCacheBonus != null && bigComparer(biggestCacheBonus.Reward, biggestCacheZone.Reward) || biggestCacheBonus != null) {
    console.log(biggestCacheBonus);
  } else if (biggestCacheZone != null) {
    console.log(biggestCacheZone);
  }
  return biggestCacheZone;
}