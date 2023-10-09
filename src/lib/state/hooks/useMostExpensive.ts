import useLevelStore from "@lib/stores/levelStore";
import useZoneMap from "./useZoneMap";
import { useEffect, useState } from "react";

const useMostExpensive = () => {
  const allZones = useZoneMap(false);
  const zones = Array.from(allZones.values());
  const unconqueredZones = zones.filter((z) => !z.Conquered);
  const [mostExpensive, setMostExpensive] = useState(
    unconqueredZones.length > 0
      ? unconqueredZones.reduce((prev, current) =>
          prev.Cost > current.Cost ? prev : current
        )
      : null
  );
  const zoneMap = useLevelStore((state) => state.Zones);
  useEffect(() => {
    if (unconqueredZones.length > 0) {
      const newMostExpensive = unconqueredZones.reduce((prev, current) =>
        prev.Cost > current.Cost ? prev : current
      );
      if (newMostExpensive?.Id !== mostExpensive?.Id) {
        setMostExpensive(newMostExpensive);
      }
    } else {
      setMostExpensive(null);
    }
  }, [zoneMap]);
  return mostExpensive ? zoneMap.get(mostExpensive.Id) : null;
};
export default useMostExpensive;
