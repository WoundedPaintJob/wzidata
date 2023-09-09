import Card from "@components/atoms/card";
import { DigSiteState } from "../lib/types";
import AssetHeader from "@components/assetHeader";
import StatRow from "@components/atoms/statrow";
import { calculateDigSiteScore } from "../lib/helper";
import { formatNumber, formatPercentage } from "@helpers/numberHelper";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import usePlayerStore from "@lib/stores/playerStore";
import useLevelStore from "@lib/stores/levelStore";
import { intervalToDuration, formatDuration } from "date-fns";

const DigSite = (props: { digSite: DigSiteState }) => {
  const digSpeedMultiplier = getMultiplier(
    MultiplierType.DigSpeed,
    usePlayerStore((state) => state.Advancements),
    usePlayerStore((state) => state.Artifacts),
    useLevelStore((state) => state.Techs)
  );
  const digTime = intervalToDuration({
    start: 0,
    end: props.digSite.Hours * 60 * 60 * 1000 * digSpeedMultiplier,
  });
  return (
    <Card>
      <Card.Header>
        <AssetHeader asset={props.digSite} />
      </Card.Header>
      <Card.Body>
        <StatRow
          name="Rating"
          value={formatPercentage(calculateDigSiteScore(props.digSite))}
        />
        <StatRow name="Time" value={`${formatDuration(digTime)}`} />
        <StatRow name="Cost" value={`${formatNumber(props.digSite.Cost)}`} />
      </Card.Body>
    </Card>
  );
};
export default DigSite;
