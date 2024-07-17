import useLevelStore from "@lib/stores/levelStore";
import { ConquerState } from "./enums";
import useZoneMap from "../useZoneMap";
import useBonusMap from "../useBonusMap";

const useMarkets = (state: ConquerState) => {
  const marketMap = useLevelStore(
    (state) => state.Markets,
    (a, b) => {
      if (a.size != b.size) return false;
      let allEqual = true;
      a.forEach((ma) => {
        const bMarket = b.get(ma.Index);
        if (!bMarket) allEqual = false;
        else {
          if (bMarket.Multiplier != ma.Multiplier) allEqual = false;
          if (bMarket.Zone != ma.Zone || bMarket.Bonus != ma.Bonus)
            allEqual = false;
        }
      });
      b.forEach((ma) => {
        const aMarket = a.get(ma.Index);
        if (!aMarket) allEqual = false;
        else {
          if (aMarket.Multiplier != ma.Multiplier) allEqual = false;
          if (aMarket.Zone != ma.Zone || aMarket.Bonus != ma.Bonus)
            allEqual = false;
        }
      });
      return allEqual;
    }
  );
  const zoneMap = useZoneMap(true);
  const bonusMap = useBonusMap(true);
  const markets = Array.from(marketMap.values())
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
  return markets;
};
export default useMarkets;
