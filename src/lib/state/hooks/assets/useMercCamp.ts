import useLevelStore from "@lib/stores/levelStore";
import { ConquerState } from "./enums";

const useMercCamps = (state: ConquerState) => {
  const mercMap = useLevelStore(
    (state) => state.MercenaryCamps,
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
      mercMap.forEach((camp) => {
        if (camp.Zone) {
          const aZone = a.get(camp.Zone);
          const bZone = b.get(camp.Zone);
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
      mercMap.forEach((camp) => {
        if (camp.Bonus) {
          const aBonus = a.get(camp.Bonus);
          const bBonus = b.get(camp.Bonus);
          if (aBonus && bBonus && aBonus.Conquered != bBonus.Conquered)
            allEqual = false;
        }
      });
      return allEqual;
    }
  );
  const mercenaryCamps = Array.from(mercMap.values()).filter((h) => {
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
  return mercenaryCamps;
};
export default useMercCamps;
