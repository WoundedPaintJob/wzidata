import Card from '@components/atoms/card';
import LevelControl from '@components/atoms/levelControl';
import Text from '@components/atoms/text';
import { formatNumber, formatPercentage } from '@helpers/numberHelper';
import usePlayerStore from '@lib/stores/playerStore';
import { AdvancementState } from '../lib/types';
import { getCostForAdvancement } from '../lib/util';

const Advancement = (props: { advancement: AdvancementState }) => {
  const levelUp = usePlayerStore((state) => state.LevelUpAdvancement);
  const levelDown = usePlayerStore((state) => state.LevelDownAdvancement);
  const currentValue = props.advancement.ValueInitial + props.advancement.ValueIncrease * props.advancement.Level;
  const maxLevel = props.advancement.ValueMax == 0 ? 100 : Math.round((props.advancement.ValueMax - props.advancement.ValueInitial) / props.advancement.ValueIncrease);
  const totalCost = getCostForAdvancement(props.advancement, maxLevel);
  const totalSpent = getCostForAdvancement(props.advancement, props.advancement.Level);
  const remaining = totalCost - totalSpent;
  const canLevelUp = props.advancement.Level < maxLevel;
  return (
    <Card>
      <Card.Header>
        {props.advancement.Name}. {totalCost}AP
      </Card.Header>
      <div className="flex">
        <div className="w-16">
          <LevelControl
            CanLevelUp={canLevelUp}
            LevelUp={() => levelUp(props.advancement)}
            CanLevelDown={props.advancement.Level > -1}
            LevelDown={() => levelDown(props.advancement)}
          />
        </div>
        <div>
          <Text size="xsmall">
            Value:{' '}
            {props.advancement.IsPercentage
              ? props.advancement.Level > -1
                ? formatPercentage(currentValue)
                : formatPercentage(0)
              : props.advancement.Level > -1
                ? formatNumber(currentValue)
                : formatNumber(0)}
            /
            {props.advancement.IsPercentage
              ? formatPercentage(props.advancement.ValueMax)
              : formatNumber(props.advancement.ValueMax)}
          </Text>
          {props.advancement.Level == -1 && (
            <Text size="xsmall">Initial: {props.advancement.CostToUnlock}</Text>
          )}
          {props.advancement.Level == 0 && (
            <Text size="xsmall">
              Upgrade: {props.advancement.CostFirstUpgrade}. Spent: {totalSpent}
              . Remaining: {remaining}
            </Text>
          )}
          {props.advancement.Level > 0 && (
            <Text size="xsmall">
              Upgrade:{' '}
              {props.advancement.CostFirstUpgrade +
                props.advancement.CostIncreasePerUpgrade *
                props.advancement.Level}
              . Spent: {totalSpent}. Remaining: {remaining}
            </Text>
          )}
        </div>
      </div>
    </Card>
  );
};
export default Advancement;
