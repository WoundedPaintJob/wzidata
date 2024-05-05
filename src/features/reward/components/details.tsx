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
import useMines from "@lib/state/hooks/assets/useMines";
import { ConquerState } from "@lib/state/hooks/assets/enums";
import useMarkets from "@lib/state/hooks/assets/useMarkets";
import useHospitals from "@lib/state/hooks/assets/useHospitals";
import useArmyCamps from "@lib/state/hooks/assets/useArmyCamps";
import useMercCamps from "@lib/state/hooks/assets/useMercCamp";

const RewardDetails = (props: { reward: Reward }) => {
  const armyCamps = useArmyCamps(ConquerState.All);
  const hospitals = useHospitals(ConquerState.All);
  const markets = useMarkets(ConquerState.All);
  const mercenaryCamps = useMercCamps(ConquerState.All);
  const mines = useMines(ConquerState.All);
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
          armyCamp={armyCamps.find((ac) => ac.Index == props.reward.ArmyCamp.Index)}
        />
      )}
      {props.reward.Cache && <CacheDetails cache={props.reward.Cache} />}
      {props.reward.Hospital && (
        <HospitalDetails
          hospital={hospitals.find((h) => h.Index == props.reward.Hospital.Index)}
        />
      )}
      {props.reward.Mine && (
        <MineDetails mine={mines.find((c) => c.Index == props.reward.Mine.Index)} />
      )}
      {props.reward.Market && (
        <MarketDetails market={markets.find((m) => m.Index == props.reward.Market.Index)} />
      )}
      {props.reward.MercenaryCamp && (
        <MercenaryCampDetails
          mercenaryCamp={mercenaryCamps.find((m) => m.Name == props.reward.MercenaryCamp.Name)}
        />
      )}
      {props.reward.Recipe && <RecipeDetails recipe={props.reward.Recipe} />}
      {props.reward.Power && <PowerDetails power={props.reward.Power} />}
    </>
  );
};
export default RewardDetails;
