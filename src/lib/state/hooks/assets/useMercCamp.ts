import useLevelStore from "@lib/stores/levelStore";
import { ConquerState } from "./enums";
import useZoneMap from "../useZoneMap";
import useBonusMap from "../useBonusMap";

const useMercCamps = (state: ConquerState) => {
  const mercMap = useLevelStore(
    (state) => state.MercenaryCamps,
    (a, b) => {
      if (a.size != b.size) return false;
      let allEqual = true;
      a.forEach((mc) => {
        const bMercs = b.get(mc.Name);
        if (!bMercs) allEqual = false;
        else {
          if (bMercs.ArmiesLeft != mc.ArmiesLeft) allEqual = false;
          if (bMercs.Zone != mc.Zone || bMercs.Bonus != mc.Bonus)
            allEqual = false;
        }
      });
      b.forEach((mc) => {
        const aMercs = a.get(mc.Name);
        if (!aMercs) allEqual = false;
        else {
          if (aMercs.ArmiesLeft != mc.ArmiesLeft) allEqual = false;
          if (aMercs.Zone != mc.Zone || aMercs.Bonus != mc.Bonus)
            allEqual = false;
        }
      });
      return allEqual;
    }
  );
  const zoneMap = useZoneMap(true);
  const bonusMap = useBonusMap(true);
  const mercenaryCamps = Array.from(mercMap.values())
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
  return mercenaryCamps;
};
export default useMercCamps;
