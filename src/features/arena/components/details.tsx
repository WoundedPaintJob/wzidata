import { Arena } from "../lib/types";
import { Settings } from "src/settings";
import Text from "@components/atoms/text";
import CacheDetails from "@features/cache/components/details";

const ArenaDetails = (props: { arena: Arena }) => {
  return <>
    <div className="flex">
      <img src={`${Settings.RewardUrl}Arena.png`} className="w-6 h-6" />
      <Text size="body">{props.arena.Template.Name}</Text>
    </div>
    <CacheDetails cache={props.arena.Reward} />
  </>
}
export default ArenaDetails;