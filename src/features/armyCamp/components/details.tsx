import { Settings } from "src/settings";
import { ArmyCampState } from "../lib/types";
import useLevelStore from "@lib/stores/levelStore";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import usePlayerStore from "@lib/stores/playerStore";
import { formatNumber } from "@helpers/numberHelper";
import { armiesProducedAtLevel } from "../lib/helper";
import StatRow from "@components/atoms/statrow";

const ArmyCampDetails = (props: { armyCamp: ArmyCampState }) => {
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const revision = useLevelStore((state) => state.LevelRevision);
  const productionMultiplier = getMultiplier(
    MultiplierType.ArmyCampProduction,
    advancements,
    artifacts,
    techs
  );
  return <>
    <div className="flex">
      <img src={`${Settings.RewardUrl}ArmyCamp.png`} className="w-6 h-6" />
      <StatRow name="A/S" value={formatNumber(armiesProducedAtLevel(props.armyCamp, revision) * productionMultiplier)} />
    </div>
  </>
}
export default ArmyCampDetails;