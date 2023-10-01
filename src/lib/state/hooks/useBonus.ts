import useLevelStore from "@lib/stores/levelStore";

const useBonus = (id: number) => {
  const bonus = useLevelStore((state) => state.Bonuses.get(id));
  return bonus;
};
export default useBonus;
