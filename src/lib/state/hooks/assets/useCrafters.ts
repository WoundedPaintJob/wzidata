import useLevelStore from "@lib/stores/levelStore";
import { ConquerState } from "./enums";

const useCrafters = (state: ConquerState) => {
  const crafterMap = useLevelStore(
    (state) => state.Crafters,
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
      crafterMap.forEach((crafter) => {
        if (crafter.Zone) {
          const aZone = a.get(crafter.Zone);
          const bZone = b.get(crafter.Zone);
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
      crafterMap.forEach((crafter) => {
        if (crafter.Bonus) {
          const aBonus = a.get(crafter.Bonus);
          const bBonus = b.get(crafter.Bonus);
          if (aBonus && bBonus && aBonus.Conquered != bBonus.Conquered)
            allEqual = false;
        }
      });
      return allEqual;
    }
  );
  const crafters = Array.from(crafterMap.values()).filter((h) => {
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
export default useCrafters;
