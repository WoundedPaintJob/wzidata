import Card from "@components/atoms/card";
import StatRow from "@components/atoms/statrow";
import { RewardType } from "@features/reward/lib/enums";
import { formatNumber, formatPercentage } from "@helpers/numberHelper";
import useLevelStore from "@lib/stores/levelStore";
import usePlayerStore from "@lib/stores/playerStore";
import { CardData } from "../lib/types";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";

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
    (z) => z.Reward.Type == RewardType.MercenaryCamp
  );
  const remainingMercBonuses = unconqueredBonuses.filter(
    (b) => b.Reward.Type == RewardType.MercenaryCamp
  );
  const totalMercenaries =
    props.zones
      .map((z) =>
        z.Reward.MercenaryCamp ? z.Reward.MercenaryCamp.ArmiesLeft : 0
      )
      .reduce((a, b) => a + b * mercMultiplier, 0) +
    props.bonuses
      .map((b) =>
        b.Reward.MercenaryCamp ? b.Reward.MercenaryCamp.ArmiesLeft : 0
      )
      .reduce((a, b) => a + b * mercMultiplier, 0);
  let remainingMercenaries = 0;
  let remainingMercenaryCost = 0;
  remainingMercZones.forEach((z) => {
    remainingMercenaries += z.Reward.MercenaryCamp.ArmiesLeft * mercMultiplier;
    remainingMercenaryCost +=
      z.Reward.MercenaryCamp.ArmiesLeft *
      mercMultiplier *
      z.Reward.MercenaryCamp.CostPerArmy *
      mercDiscountMultiplier;
  });
  remainingMercBonuses.forEach((b) => {
    remainingMercenaries += b.Reward.MercenaryCamp.ArmiesLeft * mercMultiplier;
    remainingMercenaryCost +=
      b.Reward.MercenaryCamp.ArmiesLeft *
      mercMultiplier *
      b.Reward.MercenaryCamp.CostPerArmy *
      mercDiscountMultiplier;
  });
  const totalArmies = props.zones.map((z) => z.Cost).reduce((a, b) => a + b);

  const biggestMercZone =
    remainingMercZones.length > 0
      ? remainingMercZones.reduce(function (prev, current) {
          return prev.Reward.MercenaryCamp.ArmiesLeft >
            current.Reward.MercenaryCamp.ArmiesLeft
            ? prev
            : current;
        })
      : null;
  const biggestMercBonus =
    remainingMercBonuses.length > 0
      ? remainingMercBonuses.reduce(function (prev, current) {
          return prev.Reward.MercenaryCamp.ArmiesLeft >
            current.Reward.MercenaryCamp.ArmiesLeft
            ? prev
            : current;
        })
      : null;
  let biggestLink = <></>;
  if (
    (biggestMercBonus != null &&
      biggestMercZone != null &&
      biggestMercBonus.Reward.MercenaryCamp.ArmiesLeft >
        biggestMercZone.Reward.MercenaryCamp.ArmiesLeft) ||
    biggestMercBonus != null
  )
    biggestLink = (
      <StatRow
        name={`${biggestMercBonus.Name} (B)`}
        value={formatNumber(
          biggestMercBonus.Reward.MercenaryCamp.ArmiesLeft * mercMultiplier
        )}
        onClick={() => setActiveBonus(biggestMercBonus)}
      />
    );
  else if (biggestMercZone != null)
    biggestLink = (
      <StatRow
        name={biggestMercZone.Name}
        value={formatNumber(
          biggestMercZone.Reward.MercenaryCamp.ArmiesLeft * mercMultiplier
        )}
        onClick={() => setActiveZone(biggestMercZone)}
      />
    );
  return (
    <Card>
      <Card.SmallHeader>Mercenaries</Card.SmallHeader>
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
        <StatRow
          name="Remaining Cost"
          value={formatNumber(remainingMercenaryCost)}
        />
        {biggestLink}
      </Card.Body>
    </Card>
  );
};
export default MercenaryCard;
