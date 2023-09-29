import Text from "@components/atoms/text";
import MaterialDetails from "@features/material/components/details";
import { MarketState } from "../lib/types";

const MarketDetails = (props: { market: MarketState | undefined }) => {
  if (!props.market) return <></>;
  return (
    <>
      <Text size="body">Market</Text>
      <MaterialDetails materials={props.market.Materials} className="flex" />
      <div className="flex">
        <Text size="small">Best:</Text>
        <MaterialDetails materials={[props.market.BestMaterial]} />
      </div>
    </>
  );
};
export default MarketDetails;
