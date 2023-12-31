import Text from "@components/atoms/text";
import BonusHeader from "@features/bonus/components/header";
import MaterialDetails from "@features/material/components/details";
import ZoneHeader from "@features/zone/components/header";
import { Recipe } from "../lib/types";
import { formatDuration, intervalToDuration } from "date-fns";
import MaterialImage from "@features/material/components/image";
import useLevelStore from "@lib/stores/levelStore";
import StatRow from "@components/atoms/statrow";
import useMultiplier from "@lib/state/hooks/useMultiplier";
import { MultiplierType } from "@lib/services/multiplierService/types";
const RecipeDetails = (props: { recipe: Recipe }) => {
  const setActiveMat = useLevelStore((state) => state.SetActiveMaterial);
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
    <div>
      <Text
        mode="link"
        onClick={() => setActiveMat(props.recipe.Produces.Type)}
        className="flex items-center space-x-2"
        size="small"
      >
        <span className="text-subText">Produces:</span>{" "}
        <MaterialImage material={props.recipe.Produces} />
      </Text>
      <Text size="small" mode="inactive">
        Requires:
      </Text>
      <MaterialDetails materials={props.recipe.Requires} multiplier={props.recipe.IsSmelted ? smeltDiscountMultiplier : craftDiscountMultiplier}/>
      <StatRow name="Duration:" value={formatDuration(duration)} />
      <div className="text-sm flex items-baseline">
        <Text className="mr-1" mode="inactive" size="small">
          Loc:
        </Text>
        {props.recipe.Zone && <ZoneHeader zoneId={props.recipe.Zone} />}
        {props.recipe.Bonus && <BonusHeader bonusId={props.recipe.Bonus} />}
      </div>
    </div>
  );
};

export default RecipeDetails;
