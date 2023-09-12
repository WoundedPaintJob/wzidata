import useLevelStore from "@lib/stores/levelStore";
import { CacheCardProps, CardData } from "../lib/types";
import usePlayerStore from "@lib/stores/playerStore";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { Reward } from "@features/reward/lib/types";
import { MaterialKind } from "@features/material/lib/enums";
import CacheCard from "./cacheCard";

const ResourceCacheCard = (props: CardData) => {
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const materials = useLevelStore((state) => state.Materials);
  const cacheMultiplier =
    getMultiplier(
      MultiplierType.CacheResources,
      advancements,
      artifacts,
      techs
    ) +
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
  const oreMultiplier = getMultiplier(
    MultiplierType.SellOre,
    advancements,
    artifacts,
    techs
  );
  const alloyMultiplier = getMultiplier(
    MultiplierType.SellAlloy,
    advancements,
    artifacts,
    techs
  );
  const itemMultiplier = getMultiplier(
    MultiplierType.SellItem,
    advancements,
    artifacts,
    techs
  );
  function rewardProperty(reward: Reward) {
    if (!reward.Cache || reward.Cache.Materials.length == 0) return 0;
    let totalReward = 0;
    reward.Cache.Materials.forEach((mat) => {
      const stateMat = materials.get(mat.Type);
      if (mat.Kind == MaterialKind.Ore) {
        totalReward +=
          mat.Amount * cacheMultiplier * stateMat.Cost * oreMultiplier;
      }
      if (mat.Kind == MaterialKind.Alloy) {
        totalReward +=
          mat.Amount * cacheMultiplier * stateMat.Cost * alloyMultiplier;
      }
      if (mat.Kind == MaterialKind.Item) {
        totalReward +=
          mat.Amount * cacheMultiplier * stateMat.Cost * itemMultiplier;
      }
    });
    return totalReward;
  }
  const cardProps: CacheCardProps = {
    bonuses: props.bonuses,
    cacheMultiplier: cacheMultiplier,
    conqueredHospitals: props.conqueredHospitals,
    header: "Resource cache",
    hospitalMultiplier: hospitalSaveMultiplier,
    jointStrikeMultiplier: jointStrikeMultiplier,
    rewardProperty: rewardProperty,
    zones: props.zones,
  };
  return <CacheCard {...cardProps} />;
};
export default ResourceCacheCard;
