import useLevelStore from "@lib/stores/levelStore";
import usePlayerStore from "@lib/stores/playerStore";
import { CacheCardProps, CardData } from "../lib/types";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { getMultiplier } from "@lib/services/multiplierService";
import { Reward } from "@features/reward/lib/types";
import CacheCard from "./cacheCard";

const ArmyCacheCard = (props: CardData) => {
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const cacheMultiplier =
    getMultiplier(MultiplierType.CacheArmies, advancements, artifacts, techs) +
    getMultiplier(MultiplierType.Cache, advancements, artifacts, techs) -
    1;
  const hospitalSaveMultiplier = getMultiplier(
    MultiplierType.HospitalEffect,
    advancements,
    artifacts,
    techs
  );
  const jointStrikeMultiplier = getMultiplier(
    MultiplierType.JointStrike,
    advancements,
    artifacts,
    techs
  );
  function rewardProperty(reward: Reward) {
    return reward.Cache ? reward.Cache.Armies : 0;
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
