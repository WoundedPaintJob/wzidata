import useLevelStore from "@lib/stores/levelStore";
import { ConquerState } from "./enums";
import useZoneMap from "../useZoneMap";
import useBonusMap from "../useBonusMap";

const useSmelters = (state: ConquerState) => {
  const smelterMap = useLevelStore(
    (state) => state.Smelters,
    (a, b) => {
      if (a.size != b.size) return false;
      let allEqual = true;
      a.forEach((sm) => {
        const bSmelter = b.get(sm.Index);
        if (!bSmelter) allEqual = false;
        else {
          if (bSmelter.Zone != sm.Zone || bSmelter.Bonus != sm.Bonus)
            allEqual = false;
        }
      });
      b.forEach((sm) => {
        const aSmelter = a.get(sm.Index);
        if (!aSmelter) allEqual = false;
        else {
          if (aSmelter.Zone != sm.Zone || aSmelter.Bonus != sm.Bonus)
            allEqual = false;
        }
      });
      return allEqual;
    }
  );
  const zoneMap = useZoneMap(true);
  const bonusMap = useBonusMap(true);
  const smelters = Array.from(smelterMap.values())
    .filter((h) => {
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
    })
    .sort((a, b) => a.Index - b.Index);
  return smelters;
};
export default useSmelters;
