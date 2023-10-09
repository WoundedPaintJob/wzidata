import Card from "@components/atoms/card";
import StatRow from "@components/atoms/statrow";
import { formatNumber, formatPercentage } from "@helpers/numberHelper";
import useLevelStore from "@lib/stores/levelStore";
import usePlayerStore from "@lib/stores/playerStore";
import { CardData } from "../lib/types";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import { ZoneState } from "@features/zone/lib/types";
import { BonusState } from "@features/bonus/lib/types";
import { Reward } from "@features/reward/lib/types";


const MercenaryCard = (props: CardData) => {
  const setActiveZone = useLevelStore((state) => state.SetActiveZone);
  const setActiveBonus = useLevelStore((state) => state.SetActiveBonus);

  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const unconqueredZones = props.zones.filter((z) => !z.Conquered);
  const unconqueredBonuses = props.bonuses.filter((b) => !b.Conquered);
  const mercMultiplier = getMultiplier(
    MultiplierType.MercenaryProduction,
    advancements,
    artifacts,
    techs
  );
  const mercDiscountMultiplier = getMultiplier(
    MultiplierType.MercenaryDiscount,
    advancements,
    artifacts,
    techs
  );
  const remainingMercZones = unconqueredZones.filter(
    (z) => z.Reward.MercenaryCamp
  );
  const remainingMercBonuses = unconqueredBonuses.filter(
    (b) => b.Reward.MercenaryCamp
  );
  function rewardProperty(reward: Reward) {
    return reward.MercenaryCamp ? reward.MercenaryCamp.ArmiesLeft : 0;
  }
  const totalMercenaries =
    props.zones
      .map((z) =>
        rewardProperty(z.Reward)
      )
      .reduce((a, b) => a + b * mercMultiplier, 0) +
    props.bonuses
      .map((b) =>
        rewardProperty(b.Reward)
      )
      .reduce((a, b) => a + b * mercMultiplier, 0);
  let remainingMercenaries = 0;
  let remainingMercenaryCost = 0;
  remainingMercZones.forEach((z) => {
    if (z.Reward.MercenaryCamp) {
      remainingMercenaries += z.Reward.MercenaryCamp.ArmiesLeft * mercMultiplier;
      remainingMercenaryCost +=
        z.Reward.MercenaryCamp.ArmiesLeft *
        mercMultiplier *
        z.Reward.MercenaryCamp.CostPerArmy *
        mercDiscountMultiplier;
    }
  });
  remainingMercBonuses.forEach((b) => {
    if (b.Reward.MercenaryCamp) {
      remainingMercenaries += b.Reward.MercenaryCamp.ArmiesLeft * mercMultiplier;
      remainingMercenaryCost +=
        b.Reward.MercenaryCamp.ArmiesLeft *
        mercMultiplier *
        b.Reward.MercenaryCamp.CostPerArmy *
        mercDiscountMultiplier;
    }
  });
  const totalArmies = props.zones.map((z) => z.Cost).reduce((a, b) => a + b);

  let biggestMercZone: ZoneState | null = null;
  if (remainingMercZones.length > 0) {
    remainingMercZones.forEach((zone) => {
      if (biggestMercZone == null || rewardProperty(zone.Reward) > rewardProperty(biggestMercZone.Reward)) {
        biggestMercZone = zone;
      }
    })
  }
  let biggestMercBonus: BonusState | null = null;
  if (remainingMercBonuses.length > 0) {
    remainingMercBonuses.forEach((bonus) => {
      if (biggestMercBonus == null || rewardProperty(bonus.Reward) > rewardProperty(biggestMercBonus.Reward)) {
        biggestMercBonus = bonus;
      }
    })
  }
  let biggestLink = <></>;
  if (
    biggestMercBonus != null &&
    biggestMercZone != null &&
    rewardProperty((biggestMercBonus as BonusState).Reward) >
    rewardProperty((biggestMercZone as ZoneState).Reward)) {
    const bonus = (biggestMercBonus as BonusState);
    biggestLink = (
      <StatRow
        name={`${bonus.Name} (B)`}
        value={formatNumber(
          rewardProperty(bonus.Reward) * mercMultiplier
        )}
        onClick={() => setActiveBonus(bonus)}
      />
    );
  }
  else if (biggestMercZone != null) {
    const zone = (biggestMercZone as ZoneState);
    biggestLink = (
      <StatRow
        name={zone.Name}
        value={formatNumber(
          rewardProperty(zone.Reward) * mercMultiplier
        )}
        onClick={() => setActiveZone(zone)}
      />
    );
  } else if (biggestMercBonus != null) {
    const bonus = (biggestMercBonus as BonusState);
    biggestLink = (
      <StatRow
        name={`${bonus.Name} (B)`}
        value={formatNumber(
          rewardProperty(bonus.Reward) * mercMultiplier
        )}
        onClick={() => setActiveBonus(bonus)}
      />
    );
  }
  return (
    <Card>
      <Card.Header>Mercenaries</Card.Header>
      <Card.Body>
        <StatRow
          name="Total"
          value={formatNumber(totalMercenaries)}
          percentage={formatPercentage(totalMercenaries / totalArmies)}
        />
        <StatRow
          name="Remaining"
          value={formatNumber(remainingMercenaries)}
          percentage={formatPercentage(remainingMercenaries / totalMercenaries)}
        />
        <StatRow name="Cost" value={formatNumber(remainingMercenaryCost)} />
        {biggestLink}
      </Card.Body>
    </Card>
  );
};
export default MercenaryCard;
