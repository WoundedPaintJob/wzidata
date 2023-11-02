import { CacheCardProps, CardData } from "../lib/types";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { Reward } from "@features/reward/lib/types";
import CacheCard from "./cacheCard";
import useMultiplier from "@lib/state/hooks/useMultiplier";

const ArmyCacheCard = (props: CardData) => {
  const cacheMultiplier =
    useMultiplier(MultiplierType.CacheArmies) +
    useMultiplier(MultiplierType.Cache) -
    1;
  const hospitalSaveMultiplier = useMultiplier(MultiplierType.HospitalEffect);
  const jointStrikeMultiplier = useMultiplier(MultiplierType.JointStrike);
  function rewardProperty(reward: Reward) {
    return reward.Cache ? reward.Cache.Armies * cacheMultiplier : 0;
  }
  let totalArmies = 0;
  props.zones.forEach((zone) => (totalArmies += zone.Cost));
  const cardProps: CacheCardProps = {
    bonuses: props.bonuses,
    cacheMultiplier: cacheMultiplier,
    conqueredHospitals: props.conqueredHospitals,
    header: "Army cache",
    hospitalMultiplier: hospitalSaveMultiplier,
    jointStrikeMultiplier: jointStrikeMultiplier,
    rewardProperty: rewardProperty,
    zones: props.zones,
    totalArmies: totalArmies,
  };
  return <CacheCard {...cardProps} />;
};
export default ArmyCacheCard;
