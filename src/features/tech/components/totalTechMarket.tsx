import AssetHeader from "@components/assetHeader";
import Card from "@components/atoms/card";
import { MarketState } from "@features/market/lib/types";
import MaterialDetails from "@features/material/components/details";
import { Material } from "@features/material/lib/types";

const TotalTechMarket = (props: {
  market: MarketState;
  materials: Material[];
  techDiscountMultiplier: number;
}) => {
  return (
    <Card>
      <Card.Body>
        <AssetHeader asset={props.market} />
        <MaterialDetails
          materials={props.materials}
          roundNumber="default"
          multiplier={1}
        />
      </Card.Body>
    </Card>
  );
};
export default TotalTechMarket;
