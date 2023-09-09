import Text from '@components/atoms/text';
import BonusHeader from '@features/bonus/components/header';
import MaterialDetails from '@features/material/components/details';
import MaterialLink from '@features/material/components/link';
import ZoneHeader from '@features/zone/components/header';
import { Recipe } from '../lib/types';
import { formatDuration, intervalToDuration } from 'date-fns';
const RecipeDetails = (props: { recipe: Recipe }) => {
  const duration = intervalToDuration({
    start: 0,
    end: 1000 * props.recipe.Time
  });
  return (
    <div>
      <MaterialLink material={props.recipe.Produces} />
      <MaterialDetails materials={props.recipe.Requires} />
      <Text>{formatDuration(duration)}</Text>
      <div className="text-sm">
        Loc: {props.recipe.Zone && <ZoneHeader zoneId={props.recipe.Zone} />}
        {props.recipe.Bonus && <BonusHeader bonusId={props.recipe.Bonus} />}
      </div>
    </div>
  );
};

export default RecipeDetails;
