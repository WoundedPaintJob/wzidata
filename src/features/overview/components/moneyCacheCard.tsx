import useLevelStore from "@lib/stores/levelStore";
import usePlayerStore from "@lib/stores/playerStore";
import { CacheCardProps, CardData } from "../lib/types";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { Reward } from "@features/reward/lib/types";
import CacheCard from "./cacheCard";

const MoneyCacheCard = (props: CardData) => {
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const cacheMultiplier =
    getMultiplier(MultiplierType.CacheMoney, advancements, artifacts, techs) +
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
    return reward.Cache ? reward.Cache.Money : 0;
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
