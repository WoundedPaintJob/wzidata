import Card from "@components/atoms/card";
import { EvaluatorArmyCardProps } from "../lib/types";
import StatRow from "@components/atoms/statrow";
import { formatNumber, formatPercentage } from "@helpers/numberHelper";

const EvaluatorArmies = (props: EvaluatorArmyCardProps) => {
  return (
    <Card>
      <Card.Body>
        <StatRow
          name="Remaining armies"
          value={formatNumber(props.totalArmiesRemaining)}
        />
        <StatRow
          name="Hospital saves"
          value={formatNumber(props.hospitalSaves)}
          percentage={formatPercentage(props.hospitalMultiplier)}
        />
        <StatRow
          name="Estimated remaining cost"
          value={formatNumber(props.estimatedRemainingCost)}
        />
        <StatRow
          name="Joint strike"
          value={formatPercentage(1 - props.jointStrikeMultiplier)}
        />
      </Card.Body>
    </Card>
  );
};
export default EvaluatorArmies;
