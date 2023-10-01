import useLevelStore from "@lib/stores/levelStore";

const useHospitals = (onlyConquered: boolean) => {
  const hospitalMap = useLevelStore(
    (state) => state.Hospitals,
    (a, b) => {
      if (a.size != b.size) return false;
      let allEqual = true;
      a.forEach((h) => {
        const bHospital = b.get(h.Index);
        if (!bHospital) allEqual = false;
        else if (bHospital.Level != h.Level) allEqual = false;
      });
      return allEqual;
    }
  );
  const zoneMap = useLevelStore(
    (state) => state.Zones,
    (a, b) => {
      if (a.size != b.size) return false;
      let allEqual = true;
      hospitalMap.forEach((h) => {
        if (h.Zone) {
          const aZone = a.get(h.Zone);
          const bZone = b.get(h.Zone);
          if (aZone && bZone && aZone.Conquered != bZone.Conquered)
            allEqual = false;
        }
      });
      return allEqual;
    }
  );
  const hospitals = Array.from(hospitalMap.values()).filter((h) => {
    if (h.Zone) {
      const zone = zoneMap.get(h.Zone);
      if (zone) {
        if (onlyConquered) return zone.Conquered;
        return true;
      }
      return false;
    }
    return false;
  });
  return hospitals;
};
export default useHospitals;
