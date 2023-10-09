import Card from "@components/atoms/card";
import MaterialDetails from "@features/material/components/details";
import { MarketState } from "../lib/types";
import AssetHeader from "@components/assetHeader";
import StatRow from "@components/atoms/statrow";
import { formatNumber } from "@helpers/numberHelper";
import { getMarketMoneyEstimate } from "../lib/helper";
import usePlayerStore from "@lib/stores/playerStore";
import useLevelStore from "@lib/stores/levelStore";
import Text from "@components/atoms/text";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
const Market = (props: { market: MarketState }) => {
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const alloyMultiplier = getMultiplier(
    MultiplierType.SellAlloy,
    advancements,
    artifacts,
    techs
  );
  const itemMultiplier = getMultiplier(
    MultiplierType.SellItem,
    advancements,
    artifacts,
    techs
  );
  const bestMaterialPrice =
    useLevelStore((state) =>
      state.Materials.get(props.market.BestMaterial.Type)
    )?.Cost || 1;
  return (
    <Card>
      <Card.Header>
        <AssetHeader asset={props.market} />
      </Card.Header>
      <Card.Body>
        <div className="flex space-x-2">
          <div>
            <MaterialDetails materials={props.market.Materials} />
          </div>
          <div>
            <div className="flex">
              <Text size="small">Best:</Text>
              <MaterialDetails materials={[props.market.BestMaterial]} />
            </div>
            <StatRow
              name="Profit"
              value={formatNumber(
                getMarketMoneyEstimate(
                  props.market,
                  bestMaterialPrice,
                  alloyMultiplier,
                  itemMultiplier
                )
              )}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export default Market;
