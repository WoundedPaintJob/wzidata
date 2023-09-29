import useLevelStore from "@lib/stores/levelStore";
import { getTotalArmyCampProduction } from "../lib/helper";
import Section from "@components/atoms/section";
import ArmyCamp from ".";
import StatRow from "@components/atoms/statrow";
import { formatNumber, formatPercentage } from "@helpers/numberHelper";
import { MultiplierType } from "@lib/services/multiplierService/types";
import SuperCamp from "./superCamp";
import useArmyCamps from "@lib/state/hooks/useArmyCamps";
import useMultiplier from "@lib/state/hooks/useMultiplier";

const ArmyCampList = () => {
  const armyCamps = Array.from(useArmyCamps(false).values());
  const conqueredArmyCamps = Array.from(useArmyCamps(true).values());
  const productionMultiplier = useMultiplier(MultiplierType.ArmyCampProduction);
  const costMultiplier = useMultiplier(MultiplierType.ArmyCampCost);
  const revision = useLevelStore((state) => state.LevelRevision) || 0;
  const superCamp = useLevelStore((state) => state.SuperCamp);
  const superCampMultiplier = 1.1;
  const totalProduced = getTotalArmyCampProduction(
    conqueredArmyCamps,
    superCamp,
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
