import useLevelStore from "@lib/stores/levelStore";
import { ConquerState } from "./enums";
import useZoneMap from "../useZoneMap";
import useBonusMap from "../useBonusMap";

const useMines = (state: ConquerState) => {
  const mineMap = useLevelStore(
    (state) => state.Mines,
    (a, b) => {
      if (a.size != b.size) return false;
      let allEqual = true;
      a.forEach((mi) => {
        const bMine = b.get(mi.Index);
        if (!bMine) allEqual = false;
        else {
          if (bMine.Level != mi.Level) allEqual = false;
          if (bMine.Zone != mi.Zone || bMine.Bonus != mi.Bonus)
            allEqual = false;
        }
      });
      b.forEach((mi) => {
        const aMine = a.get(mi.Index);
        if (!aMine) allEqual = false;
        else {
          if (aMine.Level != mi.Level) allEqual = false;
          if (aMine.Zone != mi.Zone || aMine.Bonus != mi.Bonus)
            allEqual = false;
        }
      });
      return allEqual;
    }
  );
  const zoneMap = useZoneMap(true);
  const bonusMap = useBonusMap(true);
  const mines = Array.from(mineMap.values())
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
  return mines;
};
export default useMines;
