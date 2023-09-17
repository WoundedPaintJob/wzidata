import MaterialDetails from "@features/material/components/details";
import { MineState } from "../lib/types";
import { Settings } from "src/settings";
import Text from "@components/atoms/text";
const MineDetails = (props: { mine: MineState | undefined }) => {
  if (!props.mine) return <></>;
  return (
    <>
      <div className="flex">
        <img src={`${Settings.RewardUrl}Mine.png`} className="w-6 h-6" />
        <Text size="small">{props.mine.Name}</Text>
      </div>
      <MaterialDetails materials={props.mine.Materials} roundNumber="default" />
    </>
  );
};
export default MineDetails;
