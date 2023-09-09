import Card from "@components/atoms/card";
import StatRow from "@components/atoms/statrow";
import Text from "@components/atoms/text";
import MaterialImage from "@features/material/components/image";
import { formatDuration, intervalToDuration } from "date-fns";
import { LevelInfo } from "../lib/types";

const Level = (props: { level: LevelInfo }) => {
  const levelTime =
    props.level.Reward && props.level.Reward.MaxTime
      ? intervalToDuration({
        start: 0,
        end: props.level.Reward.MaxTime * 24 * 60 * 60 * 1000,
      })
      : null;
  return (
    <Card>
      <Card.Header>{props.level.Name}</Card.Header>
      <Card.Body>
        {props.level.Reward && <Text>{props.level.Reward.Type}</Text>}
        {levelTime && (
          <>
            <StatRow name="Time" value={formatDuration(levelTime)} />
            <MaterialImage material={props.level.Reward.Ore} />
          </>
        )}
      </Card.Body>
    </Card>
  );
};
export default Level;
