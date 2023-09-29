import useLevelStore from "@lib/stores/levelStore";

const useBonusMap = (trackConquered: boolean) => {
  const bonusMap = useLevelStore(
    (state) => state.Bonuses,
    (a, b) => {
      if (a.size != b.size) return false;
      let allEqual = true;
      if (trackConquered) {
        a.forEach((bonus) => {
          if (b.get(bonus.Id)?.Conquered != bonus.Conquered) allEqual = false;
        });
      }
      return allEqual;
    }
  );
  return bonusMap;
};
export default useBonusMap;
