import useLevelStore from "@lib/stores/levelStore";
import { ConquerState } from "./enums";

const useMines = (state: ConquerState) => {
  const mineMap = useLevelStore(
    (state) => state.Mines,
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
      mineMap.forEach((mine) => {
        if (mine.Zone) {
          const aZone = a.get(mine.Zone);
          const bZone = b.get(mine.Zone);
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
      mineMap.forEach((mine) => {
        if (mine.Bonus) {
          const aBonus = a.get(mine.Bonus);
          const bBonus = b.get(mine.Bonus);
          if (aBonus && bBonus && aBonus.Conquered != bBonus.Conquered)
            allEqual = false;
        }
      });
      return allEqual;
    }
  );
  const mines = Array.from(mineMap.values()).filter((h) => {
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
  return mines;
};
export default useMines;
