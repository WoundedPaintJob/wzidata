import useLevelStore from "@lib/stores/levelStore";
import { useEffect, useState } from "react";
import { ConquerState } from "./enums";

const useHospitals = (state: ConquerState) => {
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
  const allHospitals = Array.from(hospitalMap.values());
  const [hospitals, setHospitals] = useState(allHospitals.filter((h) => {
    if (h.Zone) {
      const zone = zoneMap.get(h.Zone);
      if (zone) {
        if (state == ConquerState.OnlyConquered) return zone.Conquered;
        if (state == ConquerState.OnlyUnConquered) return !zone.Conquered;
        return true;
      }
      return false;
    }
    return false;
  }));
  useEffect(() => {
    const newHospitals = allHospitals.filter((h) => {
      if (h.Zone) {
        const zone = zoneMap.get(h.Zone);
        if (zone) {
          if (state == ConquerState.OnlyConquered) return zone.Conquered;
          if (state == ConquerState.OnlyUnConquered) return !zone.Conquered;
          return true;
        }
        return false;
      }
      return false;
    });
    if (newHospitals !== hospitals) {
      setHospitals(newHospitals);
    }
  }, [zoneMap, hospitalMap]);
  return hospitals;
};
export default useHospitals;
