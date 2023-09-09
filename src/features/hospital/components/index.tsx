import Card from '@components/atoms/card';
import LevelControl from '@components/atoms/levelControl';
import StatRow from '@components/atoms/statrow';
import {
  canLevelDown,
  canLevelUp,
  getAssetUpgradeCost,
} from '@helpers/assetHelper';
import { formatNumber } from '@helpers/numberHelper';
import useLevelStore from '@lib/stores/levelStore';
import { hospitalsSavedAtLevel } from '../lib/helper';
import { HospitalState } from '../lib/types';
import AssetHeader from '@components/assetHeader';
import Text from '@components/atoms/text';

const Hospital = (props: { hospital: HospitalState; multiplier: number }) => {
  const levelup = useLevelStore((state) => state.LevelUp);
  const leveldown = useLevelStore((state) => state.LevelDown);
  return (
    <Card>
      <Card.Header>
        <AssetHeader asset={props.hospital} />
      </Card.Header>
      <Card.Body>
        <div className="flex space-x-2">
          <div>
            <StatRow
              name="Level"
              value={`${props.hospital.Level}/${
                props.hospital.UpgradeCosts.length + 1
              }`}
            />
            <StatRow
              name="Saves"
              value={formatNumber(
                hospitalsSavedAtLevel(props.hospital) * props.multiplier
              )}
            />
            <LevelControl
              CanLevelUp={canLevelUp(props.hospital)}
              LevelUp={() => levelup(props.hospital)}
              CanLevelDown={canLevelDown(props.hospital)}
              LevelDown={() => leveldown(props.hospital)}
            />
          </div>
          <div>
            {canLevelUp(props.hospital) && (
              <>
                <Text size="small">Upgrade</Text>
                <StatRow
                  name="Cost"
                  value={formatNumber(getAssetUpgradeCost(props.hospital))}
                />
                <StatRow
                  name="Saves"
                  value={formatNumber(
                    hospitalsSavedAtLevel(
                      props.hospital,
                      props.hospital.Level + 1
                    ) * props.multiplier
                  )}
                />
                <StatRow
                  name="$/A"
                  value={formatNumber(
                    getAssetUpgradeCost(props.hospital) /
                      (hospitalsSavedAtLevel(
                        props.hospital,
                        props.hospital.Level + 1
                      ) *
                        props.multiplier -
                        hospitalsSavedAtLevel(props.hospital) *
                          props.multiplier)
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
export default Hospital;
