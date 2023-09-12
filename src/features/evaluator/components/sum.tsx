import Card from "@components/atoms/card";
import {
  EvaluatorArmyCardProps,
  EvaluatorCacheCardProps,
  EvaluatorMercenaryCardProps,
} from "../lib/types";
import StatRow from "@components/atoms/statrow";
import { formatNumber, formatPercentage } from "@helpers/numberHelper";

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
          name="Army diff"
          value={formatNumber(
            props.army.estimatedRemainingCost -
              (props.cache.remainingArmyCache +
                props.mercenaries.remainingMercenaries)
          )}
        />
        <StatRow
          name="Market income"
          value={formatNumber(props.totalmarketIncome)}
        />
        <StatRow
          name="Money diff"
          value={formatNumber(
            props.mercenaries.remainingCost -
              (props.cache.remainingMoneyCache +
                props.cache.remainingResourceCache +
                props.totalmarketIncome)
          )}
        />
      </Card.Body>
    </Card>
  );
};
export default EvaluatorSum;
