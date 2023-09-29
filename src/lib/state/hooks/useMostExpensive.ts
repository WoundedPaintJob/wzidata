import useLevelStore from "@lib/stores/levelStore";
import useZoneMap from "./useZoneMap";
import { useEffect, useState } from "react";

const useMostExpensive = () => {
  const allZones = useZoneMap(false);
  const zones = Array.from(allZones.values());
  const [mostExpensive, setMostExpensive] = useState(
    zones
      .filter((z) => !z.Conquered)
      .reduce((prev, current) => (prev.Cost > current.Cost ? prev : current))
  );
  const zoneMap = useLevelStore((state) => state.Zones);
  useEffect(() => {
    const newMostExpensive = Array.from(zoneMap.values())
      .filter((z) => !z.Conquered)
      .reduce((prev, current) => (prev.Cost > current.Cost ? prev : current));
    if (newMostExpensive?.Id !== mostExpensive?.Id) {
      setMostExpensive(newMostExpensive);
    }
  }, [zoneMap]);
  return zoneMap.get(mostExpensive.Id);
};
export default useMostExpensive;
