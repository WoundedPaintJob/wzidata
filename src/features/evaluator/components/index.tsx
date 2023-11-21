import Section from "@components/atoms/section";
import { MultiplierType } from "@lib/services/multiplierService/types";
import useLevelStore from "@lib/stores/levelStore";
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
import useMultiplier from "@lib/state/hooks/useMultiplier";

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
    (h) => h.Zone && zoneMap.get(h.Zone)?.Conquered
  );
  const markets = useLevelStore((state) => state.Markets);
  const materials = useLevelStore((state) => state.Materials);
  const jointStrikeMultiplier = useMultiplier(MultiplierType.JointStrike);
  const mercenaryMultiplier = useMultiplier(MultiplierType.MercenaryProduction);
  const mercenaryCostMultiplier = useMultiplier(
    MultiplierType.MercenaryDiscount
  );
  const armyCacheMultiplier =
    useMultiplier(MultiplierType.CacheArmies) +
    useMultiplier(MultiplierType.Cache) -
    1;
  const moneyCacheMultiplier =
    useMultiplier(MultiplierType.CacheMoney) +
    useMultiplier(MultiplierType.Cache) -
    1;
  const resourceCacheMultiplier =
    useMultiplier(MultiplierType.CacheResources) +
    useMultiplier(MultiplierType.Cache) -
    1;
  const oreMultiplier = useMultiplier(MultiplierType.SellOre);
  const alloyMultiplier = useMultiplier(MultiplierType.SellAlloy);
  const itemMultiplier = useMultiplier(MultiplierType.SellItem);
  const hospitalMultiplier = useMultiplier(MultiplierType.HospitalEffect);
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
