import useLevelStore from "@lib/stores/levelStore";

const useZone = (id: number) => {
  const zone = useLevelStore((state) => state.Zones.get(id));
  return zone;
};
export default useZone;
