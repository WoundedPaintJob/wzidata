import Card from "@components/atoms/card";
import { Mortar } from "../lib/types";
import AssetHeader from "@components/assetHeader";
import useLevelStore from "@lib/stores/levelStore";
import {
  getBestZoneForMortar,
  mortarGetHitChanceFromDistance,
} from "../lib/helper";
import Text from "@components/atoms/text";
import StatRow from "@components/atoms/statrow";
import { formatNumber, formatPercentage } from "@helpers/numberHelper";

const Mortar = (props: { mortar: Mortar }) => {
  const zones = useLevelStore((state) => state.Zones);
  const setActive = useLevelStore((state) => state.SetActiveZone);
  const bestZone = getBestZoneForMortar(props.mortar, zones);
  let probability = 0;
  if (bestZone != null) {
    probability = mortarGetHitChanceFromDistance(
      props.mortar.NearbyZones.find((z) => z.ZoneId == bestZone.Id).Distance
    );
  }
  return (
    <Card>
      <AssetHeader asset={props.mortar} />
      <StatRow name="Cost" value={formatNumber(props.mortar.UpgradeCosts[0])} />
      <Text>Best</Text>
      {bestZone && (
        <StatRow
          name={bestZone.Name}
          value={formatNumber(bestZone.Cost * 0.2)}
          percentage={formatPercentage(probability)}
          onClick={() => setActive(bestZone)}
        />
      )}
    </Card>
  );
};
export default Mortar;
