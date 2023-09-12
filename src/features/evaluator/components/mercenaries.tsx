import Card from "@components/atoms/card";
import StatRow from "@components/atoms/statrow";
import { formatNumber, formatPercentage } from "@helpers/numberHelper";
import { EvaluatorMercenaryCardProps } from "../lib/types";

const EvaluatorMercenaries = (props: EvaluatorMercenaryCardProps) => {
  return (
    <Card>
      <Card.Body>
        <StatRow
          name="Mercenaries"
          value={formatNumber(props.remainingMercenaries)}
          percentage={formatPercentage(props.mercenaryMultiplier)}
        />
        <StatRow
          name="Total cost"
          value={formatNumber(props.remainingCost)}
          percentage={formatPercentage(props.mercnaryCostMultiplier)}
        />
      </Card.Body>
    </Card>
  );
};
export default EvaluatorMercenaries;
