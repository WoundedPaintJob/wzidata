import Section from '@components/atoms/section';
import StatRow from '@components/atoms/statrow';
import { AdvancementType } from '@features/advancement/lib/enums';
import { getAdvancementValue } from '@features/advancement/lib/util';
import {
  hospitalSaveForZone,
  hospitalsSavedAtLevel,
} from '@features/hospital/lib/helper';
import { RewardType } from '@features/reward/lib/enums';
import { formatNumber, formatPercentage } from '@helpers/numberHelper';
import { getMultiplier } from '@lib/services/multiplierService';
import { MultiplierType } from '@lib/services/multiplierService/types';
import useLevelStore from '@lib/stores/levelStore';
import usePlayerStore from '@lib/stores/playerStore';

const Evaluator = () => {
  const zoneMap = useLevelStore((state) => state.Zones);
  const zones = Array.from(zoneMap.values());
  const unconqueredZones = zones.filter((z) => !z.Conquered);
  const bonusMap = useLevelStore((state) => state.Bonuses);
  const bonuses = Array.from(bonusMap.values());
  const unconqueredBonuses = bonuses.filter((b) => !b.Conquered);
  let remaining = 0;
  unconqueredZones.forEach((z) => (remaining += z.Cost));
  const hospitalMap = useLevelStore((state) => state.Hospitals);
  const hospitals = Array.from(hospitalMap.values());
  const conqueredHospitals = hospitals.filter(
    (h) => zoneMap.get(h.Zone).Conquered
  );
  const jointStrikeReduction = getAdvancementValue(
    usePlayerStore
      .getState()
      .Advancements.find(
        (a) => a.Type == AdvancementType.MultiBorderConquerRefund
      )
  );

  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);

  const mercenaryMultiplier = getMultiplier(MultiplierType.MercenaryProduction, advancements, artifacts, techs);
  const armyCacheMultiplier =
    getMultiplier(MultiplierType.CacheArmies, advancements, artifacts, techs) +
    getMultiplier(MultiplierType.Cache, advancements, artifacts, techs) -
    1;
  const hospitalMultiplier = getMultiplier(
    MultiplierType.HospitalEffect,
    advancements,
    artifacts,
    techs
  );
  let hospitalSaves = 0;
  conqueredHospitals.forEach(
    (h) => (hospitalSaves += hospitalsSavedAtLevel(h) * hospitalMultiplier)
  );
  let totalEstimatedCost = 0;
  unconqueredZones.forEach((z) => {
    let cost = z.Cost;
    let zoneHospitalSaves = 0;
    conqueredHospitals.forEach(
      (h) =>
        (zoneHospitalSaves += hospitalSaveForZone(h, z) * hospitalMultiplier)
    );
    cost -= zoneHospitalSaves;
    cost = Math.max(cost, 0);
    if (z.ConnectedZones.length > 1) cost *= 1 - jointStrikeReduction;
    totalEstimatedCost += cost;
  });

  let totalCache = 0;
  unconqueredZones
    .filter((z) => z.Reward.Type == RewardType.ArmyCache)
    .forEach(
      (z) => (totalCache += z.Reward.Cache.Armies * armyCacheMultiplier)
    );
  unconqueredBonuses
    .filter((b) => b.Reward.Type == RewardType.ArmyCache)
    .forEach(
      (b) => (totalCache += b.Reward.Cache.Armies * armyCacheMultiplier)
    );
  let totalMercenaries = 0;
  unconqueredZones
    .filter((z) => z.Reward.Type == RewardType.MercenaryCamp)
    .forEach(
      (z) =>
        (totalMercenaries +=
        z.Reward.MercenaryCamp.ArmiesLeft * mercenaryMultiplier)
    );
  unconqueredBonuses
    .filter((b) => b.Reward.Type == RewardType.MercenaryCamp)
    .forEach(
      (b) =>
        (totalMercenaries +=
        b.Reward.MercenaryCamp.ArmiesLeft * mercenaryMultiplier)
    );
  return (
    <Section>
      <Section.Body>
        <StatRow name="Remaining Armies" value={formatNumber(remaining)} />
        <StatRow
          name="Hospital Saves"
          value={formatNumber(hospitalSaves)}
          percentage={formatPercentage(hospitalMultiplier)}
        />
        <StatRow
          name="Estimated Cost"
          value={formatNumber(totalEstimatedCost)}
        />
        <StatRow
          name="Cache Armies"
          value={formatNumber(totalCache)}
          percentage={formatPercentage(armyCacheMultiplier)}
        />
        <StatRow
          name="Mercenaries"
          value={formatNumber(totalMercenaries)}
          percentage={formatPercentage(mercenaryMultiplier)}
        />
        <StatRow
          name="Diff"
          value={formatNumber(
            totalEstimatedCost - (totalCache + totalMercenaries)
          )}
        />
        <StatRow
          name="Joint Strike"
          value={formatPercentage(jointStrikeReduction)}
        />
      </Section.Body>
    </Section>
  );
};
export default Evaluator;
