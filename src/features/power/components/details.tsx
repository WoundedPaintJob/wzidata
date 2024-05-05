import { Power } from "../lib/types";
import Text from "@components/atoms/text";
import { Settings } from "src/settings";
const PowerDetails = (props: { power: Power }) => {
  return (
    <>
      <div className="flex">
        <img src={`${Settings.RewardUrl}Power.png`} className="w-6 h-6" />
        <Text size="body">
          {props.power.Type}
        </Text>
      </div>
    </>
  )
}
export default PowerDetails;