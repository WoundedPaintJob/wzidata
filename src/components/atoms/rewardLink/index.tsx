import { RewardLinkProps } from "./types";
import { Settings } from "src/settings";

const RewardLink = (props: RewardLinkProps) => {
  return (
    <img src={`${Settings.RewardUrl}${props.type}.png`} onClick={props.onClick} className="w-6 h-6 hover:cursor-pointer" />
  )
}
export default RewardLink;