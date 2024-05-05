import useLevelStore from "@lib/stores/levelStore";
import { CacheType, ConquerState } from "./enums";
import useZoneMap from "../useZoneMap";
import useBonusMap from "../useBonusMap";

const useCaches = (state: ConquerState, type: CacheType) => {
  const zoneMap = useZoneMap(true);
  const bonusMap = useBonusMap(true);
  const caches = Array.from(zoneMap.values()).filter((zone) => {
    if (zone.Reward.Cache) {
      if (type == CacheType.All) {
        if (state == ConquerState.OnlyConquered) return zone.Conquered;
        if (state == ConquerState.OnlyUnConquered) return !zone.Conquered;
        return true;
      } if (type == CacheType.Army && zone.Reward.Cache.Armies > 0) {
        if (state == ConquerState.OnlyConquered) return zone.Conquered;
        if (state == ConquerState.OnlyUnConquered) return !zone.Conquered;
        return true;
      } if (type == CacheType.Money && zone.Reward.Cache.Money > 0) {
        if (state == ConquerState.OnlyConquered) return zone.Conquered;
        if (state == ConquerState.OnlyUnConquered) return !zone.Conquered;
        return true;
      } if (type == CacheType.Resource && zone.Reward.Cache.Materials.length > 0) {
        if (state == ConquerState.OnlyConquered) return zone.Conquered;
        if (state == ConquerState.OnlyUnConquered) return !zone.Conquered;
        return true;
      }
      return false;
    }
  });
  const crafters = Array.from(cacheMap.values()).filter((h) => {
    if (h.Zone) {
      const zone = zoneMap.get(h.Zone);
      if (zone) {
        if (state == ConquerState.OnlyConquered) return zone.Conquered;
        if (state == ConquerState.OnlyUnConquered) return !zone.Conquered;
        return true;
      }
    }
    if (h.Bonus) {
      const bonus = bonusMap.get(h.Bonus);
      if (bonus) {
        if (state == ConquerState.OnlyConquered) return bonus.Conquered;
        if (state == ConquerState.OnlyUnConquered) return !bonus.Conquered;
        return true;
      }
    }
    return false;
  }).sort((a, b) => a.Index - b.Index);
  return crafters;
};
export default useCaches;
