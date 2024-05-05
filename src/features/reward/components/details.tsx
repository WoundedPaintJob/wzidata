import StatRow from "@components/atoms/statrow";
import Text from "@components/atoms/text";
import HospitalDetails from "@features/hospital/components/details";
import MarketDetails from "@features/market/components/details";
import RecipeDetails from "@features/recipe/components/details";
import { formatNumber } from "@helpers/numberHelper";
import useLevelStore from "@lib/stores/levelStore";
import { Reward } from "../lib/types";
import MineDetails from "@features/mine/components/details";
import CacheDetails from "@features/cache/components/details";
import ArenaDetails from "@features/arena/components/details";
import ArmyCampDetails from "@features/armyCamp/components/details";
import MercenaryCampDetails from "@features/mercenaryCamp/components/details";
import PowerDetails from "@features/power/components/details";

const RewardDetails = (props: { reward: Reward }) => {
  const armyCamps = useLevelStore((state) => state.ArmyCamps);
  const hospitals = useLevelStore((state) => state.Hospitals);
  const markets = useLevelStore((state) => state.Markets);
  const mercenaryCamps = useLevelStore((state) => state.MercenaryCamps);
  const mines = useLevelStore((state) => state.Mines);
  return (
    <>
      <Text size="body">Rewards</Text>
      <p></p>
      {props.reward.MoneyPerSecond > 0 && (
        <StatRow name="$/s" value={formatNumber(props.reward.MoneyPerSecond)} />
      )}
      {props.reward.Arena && <ArenaDetails arena={props.reward.Arena} />}
      {props.reward.ArmyCamp && (
        <ArmyCampDetails
          armyCamp={armyCamps.get(props.reward.ArmyCamp.Index)}
        />
      )}
      {props.reward.Cache && <CacheDetails cache={props.reward.Cache} />}
      {props.reward.Hospital && (
        <HospitalDetails
          hospital={hospitals.get(props.reward.Hospital.Index)}
        />
      )}
      {props.reward.Mine && (
        <MineDetails mine={mines.get(props.reward.Mine.Index)} />
      )}
      {props.reward.Market && (
        <MarketDetails market={markets.get(props.reward.Market.Index)} />
      )}
      {props.reward.MercenaryCamp && (
        <MercenaryCampDetails
          mercenaryCamp={mercenaryCamps.get(props.reward.MercenaryCamp.Name)}
        />
      )}
      {props.reward.Recipe && <RecipeDetails recipe={props.reward.Recipe} />}
      {props.reward.Power && <PowerDetails power={props.reward.Power} />}
    </>
  );
};
export default RewardDetails;
