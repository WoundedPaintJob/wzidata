import useLevelStore from "@lib/stores/levelStore";
import { getTotalArmyCampProduction } from "../lib/helper";
import Section from "@components/atoms/section";
import ArmyCamp from ".";
import usePlayerStore from "@lib/stores/playerStore";
import StatRow from "@components/atoms/statrow";
import { formatNumber, formatPercentage } from "@helpers/numberHelper";
import { getMultiplier } from "@lib/services/multiplierService";
import { MultiplierType } from "@lib/services/multiplierService/types";
import SuperCamp from "./superCamp";

const ArmyCampList = () => {
  const armyCamps = Array.from(
    useLevelStore((state) => state.ArmyCamps).values()
  );
  const advancements = usePlayerStore((state) => state.Advancements);
  const artifacts = usePlayerStore((state) => state.Artifacts);
  const techs = useLevelStore((state) => state.Techs);
  const productionMultiplier = getMultiplier(
    MultiplierType.ArmyCampProduction,
    advancements,
    artifacts,
    techs
  );
  const costMultiplier = getMultiplier(
    MultiplierType.ArmyCampCost,
    advancements,
    artifacts,
    techs
  );
  const zones = useLevelStore((state) => state.Zones);
  const bonuses = useLevelStore((state) => state.Bonuses);
  const revision = useLevelStore((state) => state.LevelRevision);
  const superCamp = useLevelStore((state) => state.SuperCamp);
  const superCampMultiplier = 1.1;
  const totalProduced = getTotalArmyCampProduction(
    armyCamps,
    superCamp,
    zones,
    bonuses,
    productionMultiplier,
    revision,
    superCampMultiplier
  );
  return (
    <Section>
      <Section.Body>
        <div className="flex">
          <StatRow name="Total Produced" value={formatNumber(totalProduced)} />
          <StatRow
            name="Multiplier"
            value={formatPercentage(productionMultiplier)}
          />
        </div>
        <Section.CardList>
          <SuperCamp
            multiplier={productionMultiplier}
            superCampMultiplier={superCampMultiplier}
          />
          {armyCamps
            .sort((a, b) => a.Index - b.Index)
            .map((ac) => {
              return (
                <ArmyCamp
                  key={ac.Index}
                  armyCamp={ac}
                  productionMultiplier={productionMultiplier}
                  costMultiplier={costMultiplier}
                />
              );
            })}
        </Section.CardList>
      </Section.Body>
    </Section>
  );
};

export default ArmyCampList;
