import useLevelStore from "@lib/stores/levelStore";

const useZoneMap = (trackConquered: boolean) => {
  const zoneMap = useLevelStore(
    (state) => state.Zones,
    (a, b) => {
      if (a.size != b.size) return false;
      let allEqual = true;
      if (trackConquered) {
        a.forEach((z) => {
          if (b.get(z.Id)?.Conquered != z.Conquered) allEqual = false;
        });
      }
      return allEqual;
    }
  );
  return zoneMap;
};
export default useZoneMap;
