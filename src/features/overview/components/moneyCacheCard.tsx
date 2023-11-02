import { CacheCardProps, CardData } from "../lib/types";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { Reward } from "@features/reward/lib/types";
import CacheCard from "./cacheCard";
import useMultiplier from "@lib/state/hooks/useMultiplier";

const MoneyCacheCard = (props: CardData) => {
  const cacheMultiplier =
    useMultiplier(MultiplierType.CacheMoney) +
    useMultiplier(MultiplierType.Cache) -
    1;
  const hospitalSaveMultiplier = useMultiplier(MultiplierType.HospitalEffect);
  const jointStrikeMultiplier = useMultiplier(MultiplierType.JointStrike);
  function rewardProperty(reward: Reward) {
    return reward.Cache ? reward.Cache.Money * cacheMultiplier : 0;
  }
  const cardProps: CacheCardProps = {
    bonuses: props.bonuses,
    cacheMultiplier: cacheMultiplier,
    conqueredHospitals: props.conqueredHospitals,
    header: "Money cache",
    hospitalMultiplier: hospitalSaveMultiplier,
    jointStrikeMultiplier: jointStrikeMultiplier,
    rewardProperty: rewardProperty,
    zones: props.zones,
  };
  return <CacheCard {...cardProps} />;
};
export default MoneyCacheCard;
