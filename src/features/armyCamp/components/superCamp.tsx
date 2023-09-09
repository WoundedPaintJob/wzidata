import Card from '@components/atoms/card';
import LevelControl from '@components/atoms/levelControl';
import StatRow from '@components/atoms/statrow';
import Text from '@components/atoms/text';
import { formatNumber } from '@helpers/numberHelper';
import useLevelStore from '@lib/stores/levelStore';
const SuperCamp = (props: {
  multiplier: number;
  superCampMultiplier: number;
}) => {
  const camp = useLevelStore((state) => state.SuperCamp);
  const levelup = useLevelStore((state) => state.LevelUp);
  const leveldown = useLevelStore((state) => state.LevelDown);
  const multiplier = props.multiplier * props.superCampMultiplier;
  return (
    <Card>
      <Card.Header>
        <Text mode="link">SuperCamp</Text>
      </Card.Header>
      <Card.Body>
        <div className="flex space-x-2">
          <div>
            <StatRow
              name="Level"
              value={`${camp.Level}/${camp.Levels.length + 1}`}
            />
            <StatRow
              name="A/S"
              value={formatNumber(
                camp.Levels[camp.Level - 1].Produced * multiplier
              )}
            />
            <LevelControl
              CanLevelUp={camp.Level <= camp.Levels.length}
              LevelUp={() => levelup(camp)}
              CanLevelDown={camp.Level > 1}
              LevelDown={() => leveldown(camp)}
            />
          </div>
          <div>
            {camp.Level <= camp.Levels.length && (
              <>
                <StatRow name="Upgrade" />
                <StatRow
                  name="Cost"
                  value={formatNumber(camp.Levels[camp.Level].Cost)}
                />
                <StatRow
                  name="A/S"
                  value={formatNumber(
                    camp.Levels[camp.Level].Produced * multiplier
                  )}
                />
                <StatRow
                  name="$/A"
                  value={formatNumber(
                    camp.Levels[camp.Level].Cost /
											(camp.Levels[camp.Level].Produced * multiplier -
												camp.Levels[camp.Level - 1].Produced * multiplier)
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
export default SuperCamp;
