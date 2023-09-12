import Card from "@components/atoms/card";
import { EvaluatorCacheCardProps } from "../lib/types";
import StatRow from "@components/atoms/statrow";
import { formatNumber, formatPercentage } from "@helpers/numberHelper";

const EvaluatorCache = (props: EvaluatorCacheCardProps) => {
  return (
    <Card>
      <Card.Body>
        <StatRow
          name="Cache Armies"
          value={formatNumber(props.remainingArmyCache)}
          percentage={formatPercentage(props.armyCacheMultiplier)}
        />{" "}
        <StatRow
          name="Cache Money"
          value={formatNumber(props.remainingMoneyCache)}
          percentage={formatPercentage(props.moneyCacheMultiplier)}
        />{" "}
        <StatRow
          name="Cache Resources"
          value={formatNumber(props.remainingResourceCache)}
          percentage={formatPercentage(props.resourceCacheMultiplier)}
        />
      </Card.Body>
    </Card>
  );
};
export default EvaluatorCache;
