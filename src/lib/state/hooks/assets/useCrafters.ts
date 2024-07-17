import useLevelStore from "@lib/stores/levelStore";
import { ConquerState } from "./enums";
import useZoneMap from "../useZoneMap";
import useBonusMap from "../useBonusMap";

const useCrafters = (state: ConquerState) => {
  const crafterMap = useLevelStore(
    (state) => state.Crafters,
    (a, b) => {
      if (a.size != b.size) return false;
      let allEqual = true;
      a.forEach((cr) => {
        const bCrafter = b.get(cr.Index);
        if (!bCrafter) allEqual = false;
        else {
          if (bCrafter.Zone != cr.Zone || bCrafter.Bonus != cr.Bonus)
            allEqual = false;
        }
      });
      b.forEach((cr) => {
        const aCrafter = a.get(cr.Index);
        if (!aCrafter) allEqual = false;
        else {
          if (aCrafter.Zone != cr.Zone || aCrafter.Bonus != cr.Bonus)
            allEqual = false;
        }
      });
      return allEqual;
    }
  );
  const zoneMap = useZoneMap(true);
  const bonusMap = useBonusMap(true);
  const crafters = Array.from(crafterMap.values())
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
  return crafters;
};
export default useCrafters;
