import useLevelStore from "@lib/stores/levelStore";

const useArmyCamps = (onlyConquered: boolean) => {
  const armyCampMap = useLevelStore(
    (state) => state.ArmyCamps,
    (a, b) => {
      if (a.size != b.size) return false;
      let allEqual = true;
      a.forEach((h) => {
        const bCamp = b.get(h.Index);
        if (!bCamp) allEqual = false;
        else if (bCamp.Level != h.Level) allEqual = false;
      });
      return allEqual;
    }
  );
  const zoneMap = useLevelStore(
    (state) => state.Zones,
    (a, b) => {
      if (a.size != b.size) return false;
      let allEqual = true;
      armyCampMap.forEach((camp) => {
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
      armyCampMap.forEach((camp) => {
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
  const armyCamps = Array.from(armyCampMap.values()).filter((h) => {
    if (h.Zone) {
      const zone = zoneMap.get(h.Zone);
      if (zone) {
        if (onlyConquered) return zone.Conquered;
        return true;
      }
    }
    if (h.Bonus) {
      const bonus = bonusMap.get(h.Bonus);
      if (bonus) {
        if (onlyConquered) return bonus.Conquered;
        return true;
      }
    }
    return false;
  });
  return armyCamps;
};
export default useArmyCamps;
