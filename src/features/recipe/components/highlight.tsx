import MaterialDetails from "@features/material/components/details";
import { Recipe } from "../lib/types";
import { MultiplierType } from "@lib/services/multiplierService/types";
import useMultiplier from "@lib/state/hooks/useMultiplier";
import { formatDuration, intervalToDuration } from "date-fns";
import Text from "@components/atoms/text";
import StatRow from "@components/atoms/statrow";
import BonusHeader from "@features/bonus/components/header";
import ZoneHeader from "@features/zone/components/header";

const RecipeHighlight = (props: { recipe: Recipe }) => {
  const craftSpeedMultiplier = useMultiplier(MultiplierType.CrafterSpeed);
  const craftDiscountMultiplier = useMultiplier(MultiplierType.CrafterDiscount);
  const smeltSpeedmultiplier = useMultiplier(MultiplierType.CrafterSpeed);
  const smeltDiscountMultiplier = useMultiplier(MultiplierType.SmelterDiscount);

  const duration = intervalToDuration({
    start: 0,
    end:
      1000 *
      props.recipe.Time *
      (props.recipe.IsSmelted ? smeltSpeedmultiplier : craftSpeedMultiplier),
  });
  return (
    <>
      <Text size="small" mode="inactive">
        Requires:
      </Text>
      <MaterialDetails
        materials={props.recipe.Requires}
        multiplier={
          props.recipe.IsSmelted
            ? smeltDiscountMultiplier
            : craftDiscountMultiplier
        }
        roundNumber="formatted"
      />
      <StatRow name="Duration:" value={formatDuration(duration)} />
      <div className="text-sm flex items-baseline">
        <Text className="mr-1" mode="inactive" size="small">
          Loc:
        </Text>
        {props.recipe.Zone && <ZoneHeader zoneId={props.recipe.Zone} />}
        {props.recipe.Bonus && <BonusHeader bonusId={props.recipe.Bonus} />}
      </div>
    </>
  );
};
export default RecipeHighlight;
