import Section from "@components/atoms/section";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import useLevelStore from "@lib/stores/levelStore";
import usePlayerStore from "@lib/stores/playerStore";
import {
  getArmyCardProps,
  getCacheCardProps,
  getMercenaryCardProps,
} from "../lib/helper";
import EvaluatorArmies from "./armies";
import EvaluatorCache from "./cache";
import EvaluatorMercenaries from "./mercenaries";
import EvaluatorSum from "./sum";
import { getMarketMoneyEstimate } from "@features/market/lib/helper";

const Evaluator = () => {
  const zoneMap = useLevelStore((state) => state.Zones);
  const zones = Array.from(zoneMap.values());
  const unconqueredZones = zones.filter((z) => !z.Conquered);
  const bonusMap = useLevelStore((state) => state.Bonuses);
  const bonuses = Array.from(bonusMap.values());
  const unconqueredBonuses = bonuses.filter((b) => !b.Conquered);
  const hospitalMap = useLevelStore((state) => state.Hospitals);
  const hospitals = Array.from(hospitalMap.values());
  const conqueredHospitals = hospitals.filter(
    (h) => (h.Zone && zoneMap.get(h.Zone)?.Conquered)
  );
  const markets = useLevelStore((state) => state.Markets);
  const materials = useLevelStore((state) => state.Materials);
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const jointStrikeMultiplier = getMultiplier(
    MultiplierType.JointStrike,
    advancements,
    artifacts,
    techs
  );
  const mercenaryMultiplier = getMultiplier(
    MultiplierType.MercenaryProduction,
    advancements,
    artifacts,
    techs
  );
  const mercenaryCostMultiplier = getMultiplier(
    MultiplierType.MercenaryDiscount,
    advancements,
    artifacts,
    techs
  );
  const armyCacheMultiplier =
    getMultiplier(MultiplierType.CacheArmies, advancements, artifacts, techs) +
    getMultiplier(MultiplierType.Cache, advancements, artifacts, techs) -
    1;
  const moneyCacheMultiplier =
    getMultiplier(MultiplierType.CacheMoney, advancements, artifacts, techs) +
    getMultiplier(MultiplierType.Cache, advancements, artifacts, techs) -
    1;
  const resourceCacheMultiplier =
    getMultiplier(
      MultiplierType.CacheResources,
      advancements,
      artifacts,
      techs
    ) +
    getMultiplier(MultiplierType.Cache, advancements, artifacts, techs) -
    1;
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
  const hospitalMultiplier = getMultiplier(
    MultiplierType.HospitalEffect,
    advancements,
    artifacts,
    techs
  );
  const armyCardProps = getArmyCardProps(
    unconqueredZones,
    conqueredHospitals,
    hospitalMultiplier,
    jointStrikeMultiplier
  );
  const cacheCardProps = getCacheCardProps(
    unconqueredZones,
    unconqueredBonuses,
    armyCacheMultiplier,
    moneyCacheMultiplier,
    resourceCacheMultiplier,
    oreMultiplier,
    alloyMultiplier,
    itemMultiplier,
    materials
  );
  const mercenaryCardProps = getMercenaryCardProps(
    unconqueredZones,
    unconqueredBonuses,
    mercenaryMultiplier,
    mercenaryCostMultiplier
  );
  let totalMarketIncome = 0;
  markets.forEach((market) => {
    totalMarketIncome += getMarketMoneyEstimate(
      market,
      materials.get(market.BestMaterial.Type)?.Cost || 0,
      alloyMultiplier,
      itemMultiplier
    );
  });
  return (
    <Section>
      <Section.Body>
        <Section.CardList>
          <EvaluatorArmies {...armyCardProps} />
          <EvaluatorCache {...cacheCardProps} />
          <EvaluatorMercenaries {...mercenaryCardProps} />
          <EvaluatorSum
            army={armyCardProps}
            cache={cacheCardProps}
            mercenaries={mercenaryCardProps}
            totalmarketIncome={totalMarketIncome}
          />
        </Section.CardList>
      </Section.Body>
    </Section>
  );
};
export default Evaluator;
