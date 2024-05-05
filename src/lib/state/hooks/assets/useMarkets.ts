import useLevelStore from "@lib/stores/levelStore";
import { ConquerState } from "./enums";

const useMarkets = (state: ConquerState) => {
  const marketMap = useLevelStore(
    (state) => state.Markets,
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
      marketMap.forEach((market) => {
        if (market.Zone) {
          const aZone = a.get(market.Zone);
          const bZone = b.get(market.Zone);
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
      marketMap.forEach((market) => {
        if (market.Bonus) {
          const aBonus = a.get(market.Bonus);
          const bBonus = b.get(market.Bonus);
          if (aBonus && bBonus && aBonus.Conquered != bBonus.Conquered)
            allEqual = false;
        }
      });
      return allEqual;
    }
  );
  const markets = Array.from(marketMap.values()).filter((h) => {
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
  return markets;
};
export default useMarkets;
