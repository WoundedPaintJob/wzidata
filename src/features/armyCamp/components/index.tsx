import Card from "@components/atoms/card";
import { ArmyCampState } from "../lib/types";
import AssetHeader from "@components/assetHeader";
import { armiesProducedAtLevel } from "../lib/helper";
import StatRow from "@components/atoms/statrow";
import { formatNumber } from "@helpers/numberHelper";
import LevelControl from "@components/atoms/levelControl";
import {
  canLevelUp,
  canLevelDown,
  getAssetUpgradeCost,
} from "@helpers/assetHelper";
import useLevelStore from "@lib/stores/levelStore";
import Text from "@components/atoms/text";
import CheckBox from "@components/atoms/checkbox";

const ArmyCamp = (props: {
  armyCamp: ArmyCampState;
  productionMultiplier: number;
  costMultiplier: number;
}) => {
  const levelup = useLevelStore((state) => state.LevelUp);
  const leveldown = useLevelStore((state) => state.LevelDown);
  const revision = useLevelStore((state) => state.LevelRevision);
  const toggleSuperCharge = useLevelStore((state) => state.SuperChargeArmyCamp);
  return (
    <Card>
      <Card.Header>
        <AssetHeader asset={props.armyCamp} />
      </Card.Header>
      <Card.Body>
        <div className="flex space-x-2">
          <div>
            <StatRow
              name="Level"
              value={`${props.armyCamp.Level}/${props.armyCamp.UpgradeCosts.length + 1}`}
            />
            <StatRow
              name="A/S"
              value={formatNumber(
                armiesProducedAtLevel(props.armyCamp, revision) *
                props.productionMultiplier
              )}
            />
            <div className="flex">
              <Text size="small">SC: </Text>
              <CheckBox
                checked={props.armyCamp.SuperCharged || false}
                onClick={() => toggleSuperCharge(props.armyCamp)}
              />
            </div>
            <LevelControl
              CanLevelUp={canLevelUp(props.armyCamp)}
              LevelUp={() => levelup(props.armyCamp)}
              CanLevelDown={canLevelDown(props.armyCamp)}
              LevelDown={() => leveldown(props.armyCamp)}
            />
          </div>
          <div>
            {canLevelUp(props.armyCamp) && (
              <>
                <StatRow name="Upgrade" />
                <StatRow
                  name="Cost"
                  value={formatNumber(
                    getAssetUpgradeCost(props.armyCamp) * props.costMultiplier
                  )}
                />
                <StatRow
                  name="A/S"
                  value={formatNumber(
                    armiesProducedAtLevel(
                      props.armyCamp,
                      revision,
                      props.armyCamp.Level + 1
                    ) * props.productionMultiplier
                  )}
                />
                <StatRow
                  name="$/A"
                  value={formatNumber(
                    getAssetUpgradeCost(props.armyCamp) **
                    props.costMultiplier /
                    (armiesProducedAtLevel(
                      props.armyCamp,
                      revision,
                      props.armyCamp.Level + 1
                    ) *
                      props.productionMultiplier -
                      armiesProducedAtLevel(props.armyCamp, revision) *
                      props.productionMultiplier)
                  )}
                />
              </>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export default ArmyCamp;
