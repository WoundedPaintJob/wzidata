import Card from "@components/atoms/card";
import CheckBox from "@components/atoms/checkbox";
import RewardDetails from "@features/reward/components/details";
import useLevelStore from "@lib/stores/levelStore";
import { BonusState } from "../lib/types";

const BonusHighlight = (props: { bonus: BonusState }) => {
  const toggleConquered = useLevelStore((state) => state.ConquerBonus);
  if (!props.bonus) return <>No Bonus</>;
  return (
    <Card>
      <Card.Header>
        <div className="flex">
          {props.bonus.Name}
          <CheckBox
            checked={props.bonus.Conquered || false}
            onClick={() => toggleConquered(props.bonus)}
          />
        </div>
      </Card.Header>
      <Card.Body>
        <RewardDetails reward={props.bonus.Reward} />
      </Card.Body>
    </Card>
  );
};
export default BonusHighlight;
