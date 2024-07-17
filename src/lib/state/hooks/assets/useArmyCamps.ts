import useLevelStore from "@lib/stores/levelStore";
import { ConquerState } from "./enums";
import useZoneMap from "../useZoneMap";
import useBonusMap from "../useBonusMap";

const useArmyCamps = (state: ConquerState) => {
  const armyCampMap = useLevelStore(
    (state) => state.ArmyCamps,
    (a, b) => {
      if (a.size != b.size) return false;
      let allEqual = true;
      a.forEach((ac) => {
        const bCamp = b.get(ac.Index);
        if (!bCamp) allEqual = false;
        else {
          if (bCamp.Level != ac.Level) allEqual = false;
          if (bCamp.SuperCharged != ac.SuperCharged) allEqual = false;
          if (bCamp.Zone != ac.Zone || bCamp.Bonus != ac.Bonus)
            allEqual = false;
        }
      });
      b.forEach((ac) => {
        const aCamp = a.get(ac.Index);
        if (!aCamp) allEqual = false;
        else {
          if (aCamp.Level != ac.Level) allEqual = false;
          if (aCamp.SuperCharged != ac.SuperCharged) allEqual = false;
          if (aCamp.Zone != ac.Zone || aCamp.Bonus != ac.Bonus)
            allEqual = false;
        }
      });
      return allEqual;
    }
  );
  const zoneMap = useZoneMap(true);
  const bonusMap = useBonusMap(true);
  const armyCamps = Array.from(armyCampMap.values()).filter((h) => {
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
  });
  return armyCamps;
};
export default useArmyCamps;
