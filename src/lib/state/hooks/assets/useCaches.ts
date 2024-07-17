import useLevelStore from "@lib/stores/levelStore";
import { CacheType, ConquerState } from "./enums";
import useZoneMap from "../useZoneMap";
import useBonusMap from "../useBonusMap";
import { useState } from "react";
import { Reward } from "@features/reward/lib/types";
const isCache = (reward: Reward, conquered: boolean, state: ConquerState, type: CacheType) => {
if (reward.Cache) {
      if (type == CacheType.All) {
        if (state == ConquerState.OnlyConquered) return conquered;
        if (state == ConquerState.OnlyUnConquered) return !conquered;
        return true;
      }
      if (type == CacheType.Army && reward.Cache.Armies > 0) {
        if (state == ConquerState.OnlyConquered) return conquered;
        if (state == ConquerState.OnlyUnConquered) return !conquered;
        return true;
      }
      if (type == CacheType.Money && reward.Cache.Money > 0) {
        if (state == ConquerState.OnlyConquered) return conquered;
        if (state == ConquerState.OnlyUnConquered) return !conquered;
        return true;
      }
      if (
        type == CacheType.Resource &&
        reward.Cache.Materials.length > 0
      ) {
        if (state == ConquerState.OnlyConquered) return conquered;
        if (state == ConquerState.OnlyUnConquered) return !conquered;
        return true;
      }
      return false;
    }
}
const useCaches = (state: ConquerState, type: CacheType) => {
  const zoneMap = useZoneMap(true);
  const bonusMap = useBonusMap(true);
  const zoneCaches = Array.from(zoneMap.values()).filter((zone) => { 
    return isCache(zone.Reward, zone.Conquered, state, type);
  });
  const bonusCaches = Array.from(bonusMap.values()).filter((bonus) => { 
    return isCache(bonus.Reward, bonus.Conquered, state, type);
  });
};
export default useCaches;
