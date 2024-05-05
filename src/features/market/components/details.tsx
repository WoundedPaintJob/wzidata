import Text from "@components/atoms/text";
import { Settings } from "src/settings";
import MaterialDetails from "@features/material/components/details";
import { MarketState } from "../lib/types";

const MarketDetails = (props: { market: MarketState | undefined }) => {
  if (!props.market) return <></>;
  return (
    <>
      <div className="flex">
        <img src={`${Settings.RewardUrl}Market.png`} className="w-6 h-6" />
        <MaterialDetails materials={props.market.Materials} className="flex" />
      </div>
      <div className="flex">
        <Text size="small">Best:</Text>
        <MaterialDetails materials={[props.market.BestMaterial]} />
      </div>
    </>
  );
};
export default MarketDetails;
