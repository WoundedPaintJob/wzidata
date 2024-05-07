import useLevelStore from "@lib/stores/levelStore";
import { ConquerState } from "./enums";

const useSmelters = (state: ConquerState) => {
  const smelterMap = useLevelStore(
    (state) => state.Smelters,
    (a, b) => {
      if (a.size != b.size) return false;
      return true;
    }
  );
  const zoneMap = useLevelStore(
    (state) => state.Zones,
    (a, b) => {
      if (a.size != b.size) return false;
      let allEqual = true;
      smelterMap.forEach((smelter) => {
        if (smelter.Zone) {
          const aZone = a.get(smelter.Zone);
          const bZone = b.get(smelter.Zone);
          if (aZone && bZone && aZone.Conquered != bZone.Conquered)
            allEqual = false;
        }
      });
      return allEqual;
    }
  );
  const bonusMap = useLevelStore(
    (state) => state.Bonuses,
    (a, b) => {
      if (a.size != b.size) return false;
      let allEqual = true;
      smelterMap.forEach((smelter) => {
        if (smelter.Bonus) {
          const aBonus = a.get(smelter.Bonus);
          const bBonus = b.get(smelter.Bonus);
          if (aBonus && bBonus && aBonus.Conquered != bBonus.Conquered)
            allEqual = false;
        }
      });
      return allEqual;
    }
  );
  const smelters = Array.from(smelterMap.values()).filter((h) => {
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
  return smelters;
};
export default useSmelters;
