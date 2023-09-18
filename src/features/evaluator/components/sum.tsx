import Card from "@components/atoms/card";
import {
  EvaluatorArmyCardProps,
  EvaluatorCacheCardProps,
  EvaluatorMercenaryCardProps,
} from "../lib/types";
import StatRow from "@components/atoms/statrow";
import { formatNumber } from "@helpers/numberHelper";

const EvaluatorSum = (props: {
  army: EvaluatorArmyCardProps;
  cache: EvaluatorCacheCardProps;
  mercenaries: EvaluatorMercenaryCardProps;
  totalmarketIncome: number;
}) => {
  return (
    <Card>
      <Card.Body>
        <StatRow
          name="Armies left"
          value={formatNumber(
            (props.cache.remainingArmyCache +
              props.mercenaries.remainingMercenaries) - props.army.estimatedRemainingCost
          )}
        />
        <StatRow
          name="Market income"
          value={formatNumber(props.totalmarketIncome)}
        />
        <StatRow
          name="Money left"
          value={formatNumber((props.cache.remainingMoneyCache +
            props.cache.remainingResourceCache +
            props.totalmarketIncome) -
            props.mercenaries.remainingCost
          )}
        />
      </Card.Body>
    </Card>
  );
};
export default EvaluatorSum;
